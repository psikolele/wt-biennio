import { promises as fs } from "node:fs";
import path from "node:path";
import type { ExtraMaterial } from "./materials-types.ts";

const LOCAL_STORAGE_DIR = path.join(process.cwd(), "public", "uploads", "materials");
const LOCAL_REGISTRY_FILE = path.join(process.cwd(), "data", "materials-registry.json");

// Helper per determinare se Vercel Blob è attivo
export function isBlobStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Inizializza cartella e file locale se non esistono
async function ensureLocalDirs() {
  try {
    await fs.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    await fs.mkdir(path.dirname(LOCAL_REGISTRY_FILE), { recursive: true });
    try {
      await fs.access(LOCAL_REGISTRY_FILE);
    } catch {
      await fs.writeFile(LOCAL_REGISTRY_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Errore creazione directory locali per materiali:", err);
  }
}

// Lettura registro materiali
export async function getAllMaterials(): Promise<ExtraMaterial[]> {
  if (isBlobStorageConfigured()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "registry/materials-registry.json" });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as ExtraMaterial[];
          return Array.isArray(data) ? data : [];
        }
      }
    } catch (err) {
      console.warn("Fallback su storage locale (Blob list/fetch fallito):", err);
    }
  }

  // Fallback Locale
  await ensureLocalDirs();
  try {
    const raw = await fs.readFile(LOCAL_REGISTRY_FILE, "utf8");
    const data = JSON.parse(raw) as ExtraMaterial[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Salvataggio registro materiali
async function saveAllMaterials(materials: ExtraMaterial[]): Promise<void> {
  if (isBlobStorageConfigured()) {
    try {
      const { put } = await import("@vercel/blob");
      await put("registry/materials-registry.json", JSON.stringify(materials, null, 2), {
        access: "public",
        addRandomSuffix: false
      });
      return;
    } catch (err) {
      console.warn("Errore salvataggio registro su Vercel Blob, fallback su locale:", err);
    }
  }

  // Fallback Locale
  await ensureLocalDirs();
  await fs.writeFile(LOCAL_REGISTRY_FILE, JSON.stringify(materials, null, 2), "utf8");
}

// Filtra materiali per anno e settimana
export async function getMaterialsForLesson(year: number, week: number): Promise<ExtraMaterial[]> {
  const all = await getAllMaterials();
  return all.filter((m) => m.year === year && m.week === week);
}

// Salva nuovo materiale (da file binario o link)
export async function addMaterial({
  year,
  week,
  lessonId,
  title,
  file,
  linkUrl
}: {
  year: number;
  week: number;
  lessonId?: string;
  title: string;
  file?: {
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  };
  linkUrl?: string;
}): Promise<ExtraMaterial> {
  const id = `mat-${year}-${week}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const uploadedAt = new Date().toISOString();

  let finalUrl = "";
  let finalFileName: string | undefined;
  let finalFileType = "link";
  let finalSizeBytes: number | undefined;
  let localPath: string | undefined;

  if (linkUrl) {
    finalUrl = linkUrl.trim();
    finalFileType = "link";
  } else if (file) {
    finalFileName = file.fileName;
    finalSizeBytes = file.buffer.length;
    const ext = path.extname(file.fileName).replace(".", "").toLowerCase();
    finalFileType = ext || "bin";

    if (isBlobStorageConfigured()) {
      const { put } = await import("@vercel/blob");
      const safeName = `materials/y${year}_w${week}_${Date.now()}_${file.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const blob = await put(safeName, file.buffer, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.mimeType || "application/octet-stream"
      });
      finalUrl = blob.url;
    } else {
      // Salvataggio locale in public/uploads/materials
      await ensureLocalDirs();
      const safeFileName = `y${year}_w${week}_${Date.now()}_${file.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const destPath = path.join(LOCAL_STORAGE_DIR, safeFileName);
      await fs.writeFile(destPath, file.buffer);
      localPath = destPath;
      finalUrl = `/uploads/materials/${safeFileName}`;
    }
  } else {
    throw new Error("Specificare un file o un link valido per il materiale.");
  }

  const newMaterial: ExtraMaterial = {
    id,
    year,
    week,
    lessonId,
    title: title.trim(),
    fileName: finalFileName,
    fileType: finalFileType,
    sizeBytes: finalSizeBytes,
    url: finalUrl,
    isExternalLink: Boolean(linkUrl),
    uploadedAt,
    localPath
  };

  const materials = await getAllMaterials();
  materials.unshift(newMaterial);
  await saveAllMaterials(materials);

  return newMaterial;
}

// Elimina materiale per ID
export async function deleteMaterialById(id: string): Promise<boolean> {
  const materials = await getAllMaterials();
  const index = materials.findIndex((m) => m.id === id);
  if (index === -1) return false;

  const target = materials[index];

  // Eliminazione file fisico se presente
  if (target.url && !target.isExternalLink) {
    if (isBlobStorageConfigured() && target.url.includes("public.blob.vercel-storage.com")) {
      try {
        const { del } = await import("@vercel/blob");
        await del(target.url);
      } catch (err) {
        console.warn("Errore eliminazione da Vercel Blob:", err);
      }
    } else if (target.localPath) {
      try {
        await fs.unlink(target.localPath);
      } catch (err) {
        console.warn("Errore eliminazione file locale:", err);
      }
    } else if (target.url.startsWith("/uploads/materials/")) {
      try {
        const localRel = path.join(process.cwd(), "public", target.url.replace(/^\//, ""));
        await fs.unlink(localRel);
      } catch (err) {
        console.warn("Errore eliminazione file locale per url:", err);
      }
    }
  }

  materials.splice(index, 1);
  await saveAllMaterials(materials);
  return true;
}
