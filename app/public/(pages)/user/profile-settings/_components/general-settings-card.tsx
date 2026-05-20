"use client";

import axios from "axios";
import { Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "@/components/UI/cards/card";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/service/notifications/notification-preferences.service";
import { NotificationPreferencesData } from "@/types/notifications/notification-preferences.types";

export default function GeneralSettingsCard() {
  const [preferences, setPreferences] =
    useState<NotificationPreferencesData | null>(null);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
  const [isUpdatingMatchAlerts, setIsUpdatingMatchAlerts] = useState(false);

  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      try {
        const response = await getNotificationPreferences();

        setPreferences(response.data);
        setMatchAlerts(response.data.matchAlertsEnabled);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
            "Unable to load notification preferences.",
          );
          return;
        }

        toast.error("Unable to load notification preferences.");
      } finally {
        setIsLoadingPreferences(false);
      }
    };

    fetchNotificationPreferences();
  }, []);

  const handleMatchAlertsToggle = async () => {
    if (isUpdatingMatchAlerts || isLoadingPreferences || !preferences) return;

    const previousMatchAlertsValue = matchAlerts;
    const nextMatchAlertsValue = !matchAlerts;

    try {
      setIsUpdatingMatchAlerts(true);
      setMatchAlerts(nextMatchAlertsValue);

      const response = await updateNotificationPreferences({
        pushEnabled: preferences.pushEnabled,
        inAppEnabled: preferences.inAppEnabled,
        matchAlertsEnabled: nextMatchAlertsValue,
        teamAlertsEnabled: preferences.teamAlertsEnabled,
        leagueAlertsEnabled: preferences.leagueAlertsEnabled,
        playerAlertsEnabled: preferences.playerAlertsEnabled,
        newsEnabled: preferences.newsEnabled,
        dailyDigestEnabled: preferences.dailyDigestEnabled,
        weeklyDigestEnabled: preferences.weeklyDigestEnabled,
        quietHoursEnabled: preferences.quietHoursEnabled,
        quietHoursStart: preferences.quietHoursStart,
        quietHoursEnd: preferences.quietHoursEnd,
        timezone:
          preferences.timezone ||
          Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      setPreferences(response.data);
      setMatchAlerts(response.data.matchAlertsEnabled);
      toast.success(response.message);
    } catch (error) {
      setMatchAlerts(previousMatchAlertsValue);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
          "Unable to update notification preferences.",
        );
        return;
      }

      toast.error("Unable to update notification preferences.");
    } finally {
      setIsUpdatingMatchAlerts(false);
    }
  };

  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
        General Settings
      </h3>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm">Match Alerts</span>

          <button
            type="button"
            disabled={isUpdatingMatchAlerts || isLoadingPreferences}
            onClick={handleMatchAlertsToggle}
            className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-1 transition disabled:cursor-not-allowed disabled:opacity-70 ${matchAlerts ? "bg-mint-green" : "bg-[#DDE8E3] dark:bg-white/15"
              }`}
          >
            <span
              className={`h-3 w-3 rounded-full bg-white transition ${matchAlerts ? "translate-x-4" : "translate-x-0"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-[#DDE8E3] pt-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF3EF] dark:bg-[#25302B]">
              <Ruler size={14} />
            </span>
            <span className="text-sm">Units</span>
          </div>

          <div className="flex rounded-lg bg-[#EAF3EF] p-1 dark:bg-[#25302B]">
            {(["metric", "imperial"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setUnit(item)}
                className={`cursor-pointer rounded-md px-4 py-1 text-xs font-semibold capitalize transition ${unit === item
                    ? "bg-secondary text-white"
                    : "text-[#6B7A75] dark:text-white/50"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}