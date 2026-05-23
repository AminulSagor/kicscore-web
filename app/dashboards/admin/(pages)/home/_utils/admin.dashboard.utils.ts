import type {
    AdminDashboardFollowedCardItem,
    AdminDashboardTopItem,
} from "@/types/admin/dashboard/admin.dashboard.types";

export const formatDashboardNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};

const formatFollowersCount = (value: number) => {
    if (value < 1000) {
        return String(value);
    }

    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);
};

export const formatDashboardDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
};

export const mapAdminDashboardFollowedItems = (
    items: AdminDashboardTopItem[],
): AdminDashboardFollowedCardItem[] => {
    return items.map((item) => ({
        name: item.entityName,
        subtitle: "",
        value: formatFollowersCount(item.followersCount),
    }));
};