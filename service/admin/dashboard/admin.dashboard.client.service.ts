import serviceClient from "@/service/base/service.client";
import type { AdminDashboardExportFormat } from "@/types/admin/dashboard/admin.dashboard.types";

export const exportAdminDashboardReport = async (
    format: AdminDashboardExportFormat,
): Promise<Blob> => {
    const response = await serviceClient.get<Blob>("/admin/dashboard/export", {
        params: {
            format,
        },
        responseType: "blob",
    });

    return response.data;
};