"use client";

import axios from "axios";
import { Download } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import { exportAdminDashboardReport } from "@/service/admin/dashboard/admin.dashboard.client.service";

const AdminExportReportButton = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportReport = async () => {
        if (isExporting) {
            return;
        }

        try {
            setIsExporting(true);

            const csvFile = await exportAdminDashboardReport("CSV");
            const downloadUrl = window.URL.createObjectURL(csvFile);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = "dashboard-report.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(downloadUrl);
            toast.success("Report exported successfully.");
        } catch (error) {
            if (axios.isAxiosError<{ message?: string }>(error)) {
                toast.error(
                    error.response?.data?.message ?? "Unable to export report.",
                );
                return;
            }

            toast.error("Unable to export report.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Button
            size="base"
            disabled={isExporting}
            onClick={handleExportReport}
            className="w-fit text-sm font-bold"
        >
            <Download size={15} />
            Export Report
        </Button>
    );
};

export default AdminExportReportButton;