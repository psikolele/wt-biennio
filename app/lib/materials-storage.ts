import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ExtraMaterial } from "./materials-types.ts";

function isServerlessReadOnlyFs(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function getStoragePaths() {
  if (isServerlessReadOnlyFs()) {
    const tmpBase = path.join(os.tmpdir(), "dashboard-lezioni");
    return {
      storageDir: path.join(tmpBase, "uploads", "materials"),
      registryFile: path.join(tmpBase, "data", "materials-registry.json"),
      isTmpFallback: true
    };
  }
  return {
    storageDir: path.join(process.cwd(), "public", "uploads", "materials"),
    registryFile: path.join(process.cwd(), "data", "materials-registry.json"),
    isTmpFallback: false
  };
}

export function getLocalMaterialsDir(): string {
  return getStoragePaths().storageDir;
}

// Helper per determinare se Vercel Blob è attivo
export function isBlobStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Inizializza cartella e file locale se non esistono
async function ensureLocalDirs() {
  const { storageDir, registryFile } = getStoragePaths();
  await fs.mkdir(storageDir, { recursive: true });
  await fs.mkdir(path.dirname(registryFile), { recursive: true });
  try {
    await fs.access(registryFile);
  } catch {
    await fs.writeFile(registryFile, JSON.stringify([], null, 2), "utf8");
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
      return [];
    } catch (err) {
      console.warn("Fallback su storage locale (Blob list/fetch fallito):", err);
    }
  }

  // Fallback Locale (o /tmp su serverless senza Blob)
  try {
    await ensureLocalDirs();
    const { registryFile } = getStoragePaths();
    const raw = await fs.readFile(registryFile, "utf8");
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
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json"
      });
      return;
    } catch (err) {
      console.warn("Errore salvataggio registro su Vercel Blob, fallback su locale:", err);
    }
  }

  // Fallback Locale (o /tmp su serverless)
  await ensureLocalDirs();
  const { registryFile } = getStoragePaths();
  await fs.writeFile(registryFile, JSON.stringify(materials, null, 2), "utf8");
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
    const safeBaseName = `y${year}_w${week}_${Date.now()}_${file.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    let uploadedToBlob = false;
    if (isBlobStorageConfigured()) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`materials/${safeBaseName}`, file.buffer, {
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: file.mimeType || "application/octet-stream"
        });
        finalUrl = blob.url;
        uploadedToBlob = true;
      } catch (err) {
        console.warn("Errore upload file su Vercel Blob, fallback su storage locale/tmp:", err);
      }
    }

    if (!uploadedToBlob) {
      await ensureLocalDirs();
      const { storageDir, isTmpFallback } = getStoragePaths();
      const destPath = path.join(storageDir, safeBaseName);
      await fs.writeFile(destPath, file.buffer);
      localPath = destPath;
      finalUrl = isTmpFallback
        ? `/api/materials/file/${encodeURIComponent(safeBaseName)}`
        : `/uploads/materials/${safeBaseName}`;
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
