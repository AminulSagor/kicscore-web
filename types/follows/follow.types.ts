export type FollowEntityType =
    | "TEAM"
    | "PLAYER"
    | "LEAGUE"
    | "FIXTURE"
    | "COACH";

export interface FollowPayload {
    entityType: FollowEntityType;
    entityId: string;
    installationId?: string;
    entityName: string;
    entityLogo?: string | null;
    notificationEnabled: boolean;
    metadata?: Record<string, string>;
}

export interface FollowEntitySnapshot {
    id: string;
    followId: string;
    entityName: string;
    entityLogo: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface FollowMetadataItem {
    id: string;
    followId: string;
    key: string;
    value: string;
    createdAt: string;
}

export interface FollowItem {
    id: string;
    userId: string | null;
    installationId: string | null;
    entityType: FollowEntityType;
    entityId: string;
    entitySnapshot: FollowEntitySnapshot;
    metadataItems: FollowMetadataItem[];
    notificationEnabled: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FollowResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: FollowItem;
    timestamp: string;
    path: string;
}

export interface FollowsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: FollowItem[];
    timestamp: string;
    path: string;
}

export interface FollowStatusPayload {
    entityType: FollowEntityType;
    entityId: string;
    installationId?: string;
}

export interface FollowStatusData {
    followed: boolean;
    follow: FollowItem | null;
}

export interface FollowStatusResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: FollowStatusData;
    timestamp: string;
    path: string;
}

export interface UnfollowPayload {
    entityType: FollowEntityType;
    entityId: string;
    installationId?: string;
}

export interface UnfollowResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    timestamp: string;
    path: string;
}

export interface MergeAnonymousFollowsPayload {
    installationId: string;
}

export interface MergeAnonymousFollowsData {
    mergedCount: number;
}

export interface MergeAnonymousFollowsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: MergeAnonymousFollowsData;
    timestamp: string;
    path: string;
}