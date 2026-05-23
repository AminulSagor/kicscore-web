import serviceClient from "@/service/base/service.client";

export interface UpdateAdminNewsPayload {
  title: string;
  snippet?: string;
  keywords: string;
}

export interface UpdateAdminNewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
  timestamp: string;
  path: string;
}

export const updateAdminNews = async (
  uuid: string,
  payload: UpdateAdminNewsPayload,
): Promise<UpdateAdminNewsResponse> => {
  const response = await serviceClient.patch<UpdateAdminNewsResponse>(
    `/admin/news/${uuid}`,
    payload,
  );

  return response.data;
};
