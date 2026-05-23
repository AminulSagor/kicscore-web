"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getFollows } from "@/service/follows/follow.service";
import { FollowEntityType, FollowItem } from "@/types/follows/follow.types";
import FollowingList from "./following-list";
import FollowingTabs from "./following-tabs";
import TrendingList from "./trending-list";

export type FollowingTabKey = "leagues" | "players" | "teams" | "coach";

const followingTabs: { label: string; value: FollowingTabKey }[] = [
  { label: "Leagues", value: "leagues" },
  { label: "Players", value: "players" },
  { label: "Teams", value: "teams" },
  { label: "Coach", value: "coach" },
];

const tabEntityTypeMap: Record<FollowingTabKey, FollowEntityType> = {
  leagues: "LEAGUE",
  players: "PLAYER",
  teams: "TEAM",
  coach: "COACH",
};

const isFollowingTabKey = (tab?: string | null): tab is FollowingTabKey => {
  return ["leagues", "players", "teams", "coach"].includes(tab ?? "");
};

export default function FollowingClient() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const activeTab: FollowingTabKey = isFollowingTabKey(tabParam)
    ? tabParam
    : "leagues";

  const [follows, setFollows] = useState<FollowItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        setIsLoading(true);

        const response = await getFollows();

        setFollows(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Unable to load follows.",
          );
          return;
        }

        toast.error("Unable to load follows.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollows();
  }, []);

  const followingItems = useMemo(() => {
    return follows.filter(
      (item) => item.entityType === tabEntityTypeMap[activeTab],
    );
  }, [activeTab, follows]);

  return (
    <main className="min-h-screen text-[#0B1F1A] dark:text-white">
      <section className="pt-14 pb-28">
        <h1 className="text-xl font-bold tracking-tight">Following</h1>

        <div className="mt-6">
          <FollowingTabs tabs={followingTabs} activeTab={activeTab} />
        </div>

        <FollowingList
          items={followingItems}
          isLoading={isLoading}
          onUnfollowSuccess={(entityType, entityId) => {
            setFollows((prev) =>
              prev.filter(
                (item) =>
                  !(
                    item.entityType === entityType && item.entityId === entityId
                  ),
              ),
            );
          }}
        />

        <TrendingList items={[]} />
      </section>
    </main>
  );
}
