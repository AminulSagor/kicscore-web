"use client";

import axios from "axios";
import { CheckCheck, CircleDot, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "@/components/UI/cards/card";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/service/notifications/notification-preferences.service";
import { NotificationItem } from "@/types/notifications/notification-preferences.types";

export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications({
          page: 1,
          limit: 20,
          isRead: false,
        });

        setNotifications(response.data.items);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Unable to load notifications.",
          );
          return;
        }

        toast.error("Unable to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead({ notificationId });

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Unable to mark notification as read.",
        );
        return;
      }

      toast.error("Unable to mark notification as read.");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (isMarkingAllRead || notifications.length === 0) return;

    try {
      setIsMarkingAllRead(true);

      const response = await markAllNotificationsAsRead();

      setNotifications([]);
      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Unable to mark all notifications.",
        );
        return;
      }

      toast.error("Unable to mark all notifications.");
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  return (
    <Card
      rounded="2xl"
      padding="md"
      shadow="lg"
      className="
        absolute right-0 top-12 z-50
        w-[min(calc(100vw-32px),456px)]!
        border border-[#DDE8E3]
        bg-white text-[#10201B]
        dark:border-white/10 dark:bg-[#111d1a] dark:text-white md:top-14
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#10201B]/70 dark:text-white/70">
          Today
        </h3>

        <button
          type="button"
          disabled={isMarkingAllRead || notifications.length === 0}
          onClick={handleMarkAllAsRead}
          className="cursor-pointer text-[#10201B]/55 transition hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-white/55 dark:hover:text-mint-green"
          aria-label="Mark all as read"
        >
          <CheckCheck size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-xs text-[#6B7A75] dark:text-white/60">
            Loading notifications...
          </p>
        )}

        {!isLoading && notifications.length === 0 && (
          <p className="text-xs text-[#6B7A75] dark:text-white/60">
            No unread notifications.
          </p>
        )}

        {notifications.map((notification) => (
          <button
            key={notification.id}
            type="button"
            onClick={() => handleMarkAsRead(notification.id)}
            className="
              relative w-full cursor-pointer rounded-lg border border-[#DDE8E3]
              border-l-4 border-l-mint-green bg-white p-4 text-left
              transition hover:bg-[#F2F7F5]
              dark:border-white/10 dark:border-l-secondary dark:bg-[#0f1a17]
              dark:hover:bg-white/8
            "
          >
            <div className="flex gap-4">
              <NotificationIcon eventType={notification.notificationEvent.eventType} />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold text-[#10201B] dark:text-white">
                    {notification.contentSnapshot.title}
                  </h4>

                  <span className="shrink-0 text-xs text-[#6B7A75] dark:text-white/60">
                    {formatNotificationTime(notification.createdAt)}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-[#6B7A75] dark:text-white/70">
                  {notification.contentSnapshot.body}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}

const NotificationIcon = ({ eventType }: { eventType: string }) => {
  if (eventType === "LINEUP" || eventType === "PLAYER") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4e6de] text-secondary dark:bg-[#25302B]">
        <CircleDot size={22} />
      </div>
    );
  }

  if (eventType === "NEWS") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4e6de] text-secondary dark:bg-[#25302B]">
        <Trophy size={22} />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-white">
      <Trophy size={22} />
    </div>
  );
};

const formatNotificationTime = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const diffInMinutes = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);

  return `${diffInDays}d ago`;
};