"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { PlayerDetailsMock } from "@/mock/player-details/player-details.mock.types";
import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import {
  followEntity,
  getFollowStatus,
  unfollowEntity,
} from "@/service/follows/follow.service";
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";
import { authStore } from "@/z_store/auth/auth.store";

type PlayerProfileHeaderProps = {
  player: PlayerDetailsMock;
};

const PlayerProfileHeader = ({ player }: PlayerProfileHeaderProps) => {
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
          entityType: "PLAYER",
          entityId: player.id,
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
  }, [authHydrated, loggedIn, player.id]);

  const handleFollowToggle = async () => {
    if (isLoading || isCheckingStatus) return;

    const installationId = loggedIn ? undefined : getOrCreateInstallationId();

    try {
      setIsLoading(true);

      if (isFollowing) {
        const response = await unfollowEntity({
          entityType: "PLAYER",
          entityId: player.id,
          installationId,
        });

        setIsFollowing(false);
        toast.success(response.message);
        return;
      }

      const response = await followEntity({
        entityType: "PLAYER",
        entityId: player.id,
        entityName: player.name,
        entityLogo: player.avatar ?? null,
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
    <header>
      <BackArrowButton />

      <div className="mt-5 flex items-center gap-5">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008A63] bg-[#EAF3EF] text-xs font-bold text-[#008A63] dark:bg-[#1F2926] dark:text-[#79e2c5]">
          {player.avatar ? (
            <Image
              src={player.avatar}
              alt={player.name}
              fill
              className="object-cover"
            />
          ) : (
            player.name.slice(0, 1)
          )}
        </div>

        <div>
          <h1 className="text-lg font-bold text-[#0B1F1A] dark:text-white">
            {player.name}
          </h1>
          <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
            {player.club}
          </p>

          <button
            type="button"
            disabled={isLoading || isCheckingStatus}
            onClick={handleFollowToggle}
            className="mt-3 cursor-pointer rounded-full bg-[#34D399] px-4 py-1.5 text-xs font-bold text-[#07110F] transition hover:bg-[#25C28A] disabled:cursor-not-allowed disabled:opacity-70"
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
          </button>
        </div>
      </div>
    </header>
  );
};

export default PlayerProfileHeader;