"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import {
  followEntity,
  getFollowStatus,
  unfollowEntity,
} from "@/service/follows/follow.service";
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";
import { authStore } from "@/z_store/auth/auth.store";

type LeagueFollowButtonProps = {
  leagueId: string;
  entityName: string;
  entityLogo: string;
};

export default function LeagueFollowButton({
  leagueId,
  entityName,
  entityLogo,
}: LeagueFollowButtonProps) {
  const loggedIn = authStore((state) => state.loggedIn);
  const authHydrated = authStore((state) => state.authHydrated);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  useEffect(() => {
    if (!authHydrated || !leagueId) return;

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
        entityName,
        entityLogo,
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
  );
}
