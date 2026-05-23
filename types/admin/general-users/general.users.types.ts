export type AdminUserStatus = "ACTIVE" | "SUSPENDED";

export type AdminGeneralUserProfile = {
    id: string;
    userId: string;
    fullName: string;
    profilePhotoFileId: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AdminGeneralUserItem = {
    id: string;
    email: string;
    role: string;
    status: AdminUserStatus;
    emailVerifiedAt: string | null;
    lastLoginAt: string | null;
    profile: AdminGeneralUserProfile | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type AdminGeneralUsersMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type AdminGeneralUsersResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        items: AdminGeneralUserItem[];
        meta: AdminGeneralUsersMeta;
    };
    timestamp: string;
    path: string;
};

export type UpdateAdminUserStatusPayload = {
    status: AdminUserStatus;
};

export type UpdateAdminUserStatusResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Omit<AdminGeneralUserItem, "profile">;
    timestamp: string;
    path: string;
};

export type DeleteAdminUserResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    timestamp: string;
    path: string;
};

export type GeneralUserDisplayStatus = "active" | "blocked";

export type GeneralUserTableItem = {
    id: string;
    name: string;
    avatarInitial: string;
    email: string;
    status: GeneralUserDisplayStatus;
    joinedDate: string;
};