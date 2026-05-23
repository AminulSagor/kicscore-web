export interface SignedUploadUrlPayload {
  fileName: string;
  contentType: string;
  sizeBytes: number;
  folder: string;
}

export interface SignedUploadUrlResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    fileId: string;
    fileKey: string;
    uploadUrl: string;
    expiresInSeconds: number;
    method: "PUT";
    headers: {
      "Content-Type": string;
    };
  };
  timestamp: string;
  path: string;
}

export interface ConfirmUploadPayload {
  fileId: string;
}

export interface ConfirmUploadResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fileKey: string;
    originalFileName: string;
    mimeType: string;
    sizeBytes: number;
    folder: string;
    status: "UPLOADED";
    uploadedAt: string;
  };
  timestamp: string;
  path: string;
}

export interface UploadedFileResult {
  fileId: string;
  fileKey: string;
}
