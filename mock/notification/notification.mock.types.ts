export type NotificationIconType = "team" | "player" | "system";

export type NotificationItemMock = {
  id: string;
  title: string;
  message: string;
  time: string;
  active?: boolean;
  iconType: NotificationIconType;
};

export type NotificationGroupMock = {
  label: string;
  items: NotificationItemMock[];
};
