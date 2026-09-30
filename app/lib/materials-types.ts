export interface ExtraMaterial {
  id: string;
  year: number;
  week: number;
  lessonId?: string;
  title: string;
  fileName?: string;
  fileType: string; // 'pdf' | 'docx' | 'pptx' | 'zip' | 'image' | 'link' | string
  sizeBytes?: number;
  url: string;
  isExternalLink?: boolean;
  uploadedAt: string;
  blobUrl?: string;
  localPath?: string;
}

export interface UploadMaterialPayload {
  year: number;
  week: number;
  lessonId?: string;
  title: string;
  linkUrl?: string; // se è un link esterno
}
