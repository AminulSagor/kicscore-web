"use client";

import axios from "axios";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import {
  followEntity,
  getFollowStatus,
  unfollowEntity,
} from "@/service/follows/follow.service";
import type { LeagueHeaderInfo } from "@/mock/league-details/league-details.mock.types";
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";
import { authStore } from "@/z_store/auth/auth.store";

type LeagueDetailsHeaderProps = {
  leagueId: string;
  league: LeagueHeaderInfo;
};

export default function LeagueDetailsHeader({
  leagueId,
  league,
}: LeagueDetailsHeaderProps) {
  const loggedIn = authStore((state) => state.loggedIn);
  const authHydrated = authStore((state) => state.authHydrated);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;

    const fetchFollowStatus = async () => {
      try {
        setIsCheckingStatus(true);

        const installationId = loggedIn
          ? undefined
          : getOrCreateInstallationId();

        const response = await getFollowStatus({
          entityType: "LEAGUE",
          entityId: leagueId,
          installationId,
        });

        setIsFollowing(response.data.followed);
      } catch {
        setIsFollowing(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    fetchFollowStatus();
  }, [authHydrated, loggedIn, leagueId]);

  const handleFollowToggle = async () => {
    if (isLoading || isCheckingStatus) return;

    const installationId = loggedIn ? undefined : getOrCreateInstallationId();

    try {
      setIsLoading(true);

      if (isFollowing) {
        const response = await unfollowEntity({
          entityType: "LEAGUE",
          entityId: leagueId,
          installationId,
        });

        setIsFollowing(false);
        toast.success(response.message);
        return;
      }

      const response = await followEntity({
        entityType: "LEAGUE",
        entityId: leagueId,
        entityName: league.name,
        entityLogo: league.logo,
        notificationEnabled: true,
        installationId,
        metadata: {
          source: "web",
        },
      });

      setIsFollowing(true);
      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Unable to update follow status.",
        );
        return;
      }

      toast.error("Unable to update follow status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="relative size-20 overflow-hidden rounded-lg bg-[#18224A] sm:size-24">
          <Image
            src={league.logo}
            alt={league.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#10201B] dark:text-white sm:text-3xl">
            {league.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#6B7A75] dark:text-white/70">
            {league.country}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:pt-7">
        <button
          type="button"
          className="flex h-8 items-center gap-2 rounded-full border border-[#DDE8E3] px-4 text-sm font-semibold text-[#10201B] dark:border-white/20 dark:text-white"
        >
          {league.season}
          <ChevronDown size={14} />
        </button>

        <Button
          type="button"
          size="sm"
          rounded="full"
          disabled={isLoading || isCheckingStatus}
          onClick={handleFollowToggle}
          className="h-8 px-5 font-bold"
        >
          {isCheckingStatus
            ? "Checking..."
            : isLoading
              ? isFollowing
                ? "Unfollowing..."
                : "Following..."
              : isFollowing
                ? "Following"
                : "Follow"}
        </Button>
      </div>
    </section>
  );
}