import serviceClient from "@/service/base/service.client";

export interface DeleteAdminNewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}

export const deleteAdminNews = async (
  uuid: string,
): Promise<DeleteAdminNewsResponse> => {
  const response = await serviceClient.delete<DeleteAdminNewsResponse>(
    `/admin/news/${uuid}`,
  );

  return response.data;
};
