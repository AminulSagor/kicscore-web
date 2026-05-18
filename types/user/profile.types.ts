export interface UpdateProfilePhotoPayload {
  fileId: string;
}

export interface UpdateProfilePhotoResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}
