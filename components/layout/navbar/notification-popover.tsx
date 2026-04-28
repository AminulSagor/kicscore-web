"use client";

import { CheckCheck, CircleDot, Trophy } from "lucide-react";

import { notificationMockData } from "@/mock/notification/notification.mock.data";
import { NotificationIconType } from "@/mock/notification/notification.mock.types";
import Card from "@/components/UI/cards/card";

export default function NotificationPopover() {
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
    dark:border-white/10 dark:bg-[#111d1a] dark:text-white
  "
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#10201B]/70 dark:text-white/70">
          Today
        </h3>

        <button
          type="button"
          className="text-[#10201B]/55 transition hover:text-secondary dark:text-white/55 dark:hover:text-mint-green"
          aria-label="Mark all as read"
        >
          <CheckCheck size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {notificationMockData.map((group, groupIndex) => (
          <div key={group.label}>
            {groupIndex !== 0 && (
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#10201B]/70 dark:text-white/70">
                {group.label}
              </h3>
            )}

            <div className="space-y-4">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`
                    relative rounded-lg border border-[#DDE8E3] bg-white p-4
                    dark:border-white/10 dark:bg-[#0f1a17]
                    ${item.active ? "border-l-4 border-l-mint-green dark:border-l-secondary" : ""}
                  `}
                >
                  <div className="flex gap-4">
                    <NotificationIcon type={item.iconType} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-bold text-[#10201B] dark:text-white">
                          {item.title}
                        </h4>

                        <span className="shrink-0 text-xs text-[#6B7A75] dark:text-white/60">
                          {item.time}
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-[#6B7A75] dark:text-white/70">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Helper component to render the appropriate icon based on the notification type
const NotificationIcon = ({ type }: { type: NotificationIconType }) => {
  if (type === "player") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4e6de] text-secondary dark:bg-[#25302B]">
        <CircleDot size={22} />
      </div>
    );
  }

  if (type === "system") {
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
