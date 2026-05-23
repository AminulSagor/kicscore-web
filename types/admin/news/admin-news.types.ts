export interface CreateAdminNewsPayload {
  title: string;
  description: string;
  snippet?: string;
  keywords: string;
  imageId: string;
}

export interface AdminNewsItem {
  id: string;
  title: string;
  description: string;
  snippet: string;
  keywords: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminNewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminNewsItem;
  timestamp: string;
  path: string;
}
