import { FollowEntityType } from "@/types/follows/follow.types";

export interface NotificationPreferencesPayload {
    pushEnabled: boolean;
    inAppEnabled: boolean;
    matchAlertsEnabled: boolean;
    teamAlertsEnabled: boolean;
    leagueAlertsEnabled: boolean;
    playerAlertsEnabled: boolean;
    newsEnabled: boolean;
    dailyDigestEnabled: boolean;
    weeklyDigestEnabled: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart: string | null;
    quietHoursEnd: string | null;
    timezone: string | null;
}

export interface NotificationPreferencesData
    extends NotificationPreferencesPayload {
    id: string;
    userId: string | null;
    installationId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationPreferencesResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: NotificationPreferencesData;
    timestamp: string;
    path: string;
}

export interface EntityNotificationSettingPayload {
    entityType: FollowEntityType;
    entityId: string;
}

export interface EntityNotificationSettingData {
    id: string;
    userId: string | null;
    installationId: string | null;
    entityType: FollowEntityType;
    entityId: string;
    notificationsEnabled: boolean;
    kickoffEnabled: boolean;
    matchStartedEnabled: boolean;
    goalEnabled: boolean;
    redCardEnabled: boolean;
    halfTimeEnabled: boolean;
    fullTimeEnabled: boolean;
    lineupEnabled: boolean;
    transferEnabled: boolean;
    injuryEnabled: boolean;
    newsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface EntityNotificationSettingResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: EntityNotificationSettingData;
    timestamp: string;
    path: string;
}

export interface NotificationEvent {
    id: string;
    eventType: string;
    entityType: FollowEntityType;
    entityId: string;
    fixtureId: string | null;
    teamId: string | null;
    playerId: string | null;
    leagueId: string | null;
    title: string;
    body: string;
    imageUrl: string | null;
    deepLink: string | null;
    priority: string;
    dedupeKey: string;
    createdAt: string;
}

export interface NotificationContentSnapshot {
    id: string;
    notificationId: string;
    title: string;
    body: string;
    imageUrl: string | null;
    deepLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationPayloadItem {
    id: string;
    notificationId: string;
    key: string;
    value: string;
    createdAt: string;
}

export interface NotificationItem {
    id: string;
    userId: string | null;
    installationId: string | null;
    notificationEventId: string;
    notificationEvent: NotificationEvent;
    contentSnapshot: NotificationContentSnapshot;
    payloadItems: NotificationPayloadItem[];
    isRead: boolean;
    readAt: string | null;
    createdAt: string;
}

export interface NotificationsMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface NotificationsData {
    items: NotificationItem[];
    meta: NotificationsMeta;
}

export interface GetNotificationsPayload {
    page?: number;
    limit?: number;
    isRead?: boolean;
}

export interface NotificationsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: NotificationsData;
    timestamp: string;
    path: string;
}

export interface MarkNotificationReadPayload {
    notificationId: string;
}

export interface MarkNotificationReadResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
    timestamp: string;
    path: string;
}

export interface MarkAllNotificationsReadData {
    updatedCount: number;
}

export interface MarkAllNotificationsReadResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: MarkAllNotificationsReadData;
    timestamp: string;
    path: string;
}