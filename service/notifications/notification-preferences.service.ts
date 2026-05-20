import serviceClient from "@/service/base/service.client";
import {
    EntityNotificationSettingPayload,
    EntityNotificationSettingResponse,
    GetNotificationsPayload,
    MarkAllNotificationsReadResponse,
    MarkNotificationReadPayload,
    MarkNotificationReadResponse,
    NotificationPreferencesPayload,
    NotificationPreferencesResponse,
    NotificationsResponse,
} from "@/types/notifications/notification-preferences.types";

export const getNotificationPreferences =
    async (): Promise<NotificationPreferencesResponse> => {
        const response = await serviceClient.get<NotificationPreferencesResponse>(
            "/notifications/preferences",
        );

        return response.data;
    };

export const updateNotificationPreferences = async (
    payload: NotificationPreferencesPayload,
): Promise<NotificationPreferencesResponse> => {
    const response = await serviceClient.patch<NotificationPreferencesResponse>(
        "/notifications/preferences",
        payload,
    );

    return response.data;
};

export const getEntityNotificationSetting = async ({
    entityType,
    entityId,
}: EntityNotificationSettingPayload): Promise<EntityNotificationSettingResponse> => {
    const response = await serviceClient.get<EntityNotificationSettingResponse>(
        "/notifications/entity-settings",
        {
            params: {
                entityType,
                entityId,
            },
        },
    );

    return response.data;
};

export const getNotifications = async ({
    page = 1,
    limit = 20,
    isRead,
}: GetNotificationsPayload = {}): Promise<NotificationsResponse> => {
    const response = await serviceClient.get<NotificationsResponse>(
        "/notifications",
        {
            params: {
                page,
                limit,
                ...(typeof isRead === "boolean" ? { isRead } : {}),
            },
        },
    );

    return response.data;
};

export const markNotificationAsRead = async ({
    notificationId,
}: MarkNotificationReadPayload): Promise<MarkNotificationReadResponse> => {
    const response = await serviceClient.patch<MarkNotificationReadResponse>(
        `/notifications/${notificationId}/read`,
    );

    return response.data;
};

export const markAllNotificationsAsRead =
    async (): Promise<MarkAllNotificationsReadResponse> => {
        const response =
            await serviceClient.patch<MarkAllNotificationsReadResponse>(
                "/notifications/read-all",
            );

        return response.data;
    };