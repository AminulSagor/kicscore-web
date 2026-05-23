export type AdminDashboardExportFormat = "CSV";

export type AdminDashboardOverviewData = {
    totalUsers: number;
    activeToday: number;
    pendingVerificationUsers: number;
    suspendedUsers: number;
    totalFollows: number;
    totalFollowedTeams: number;
    totalFollowedLeagues: number;
};

export type AdminDashboardOverviewResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminDashboardOverviewData;
    timestamp: string;
    path: string;
};

export type AdminDashboardTopItem = {
    entityId: string;
    entityName: string;
    entityLogo: string | null;
    followersCount: number;
};

export type AdminDashboardMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type AdminDashboardTopItemsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        items: AdminDashboardTopItem[];
        meta: AdminDashboardMeta;
    };
    timestamp: string;
    path: string;
};

export type AdminDashboardFollowedCardItem = {
    name: string;
    subtitle: string;
    value: string;
};