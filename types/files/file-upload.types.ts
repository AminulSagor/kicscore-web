export interface SignedUploadUrlPayload {
    fileName: string;
    contentType: string;
    sizeBytes: number;
    folder: string;
}

export interface SignedUploadUrlData {
    fileId: string;
    fileKey: string;
    uploadUrl: string;
    expiresInSeconds: number;
    method: "PUT";
    headers: {
        "Content-Type": string;
    };
}

export interface SignedUploadUrlResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: SignedUploadUrlData;
    timestamp: string;
    path: string;
}

export interface ConfirmFileUploadPayload {
    fileId: string;
}

export interface ConfirmFileUploadData {
    id: string;
    fileKey: string;
    originalFileName: string;
    mimeType: string;
    sizeBytes: number;
    folder: string;
    status: "UPLOADED";
    uploadedAt: string;
}

export interface ConfirmFileUploadResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ConfirmFileUploadData;
    timestamp: string;
    path: string;
}