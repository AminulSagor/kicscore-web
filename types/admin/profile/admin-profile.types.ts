export interface AdminProfileInfo {
    id: string;
    userId: string;
    fullName: string;
    profilePhotoFileId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AdminProfileUser {
    id: string;
    email: string;
    role: "ADMIN";
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    emailVerifiedAt: string | null;
    lastLoginAt: string | null;
    profile: AdminProfileInfo | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface AdminProfileResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminProfileUser;
    timestamp: string;
    path: string;
}

export interface UpdateAdminProfilePayload {
    fullName: string;
    profilePhotoFileId?: string | null;
}

export interface UpdateAdminProfileResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminProfileInfo;
    timestamp: string;
    path: string;
}

export interface ChangeAdminPasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangeAdminPasswordResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    timestamp: string;
    path: string;
}