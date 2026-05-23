"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import { IMAGE } from "@/constants/image.path";
import {
  followEntity,
  getFollowStatus,
  unfollowEntity,
} from "@/service/follows/follow.service";
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";
import { authStore } from "@/z_store/auth/auth.store";

type Props = {
  teamId: string;
  teamName: string;
  logo?: string;
  initialIsFollowing?: boolean;
};

export default function TeamFollowButton({
  teamId,
  teamName,
  logo,
  initialIsFollowing = false,
}: Props) {
  const loggedIn = authStore((state) => state.loggedIn);
  const authHydrated = authStore((state) => state.authHydrated);

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  //======= Load Follow Status =======//
  useEffect(() => {
    if (!authHydrated) {
      return;
    }

    const fetchFollowStatus = async () => {
      try {
        setIsCheckingStatus(true);

        const installationId = loggedIn
          ? undefined
          : getOrCreateInstallationId();

        const response = await getFollowStatus({
          entityType: "TEAM",
          entityId: teamId,
          installationId,
        });

        setIsFollowing(response.data.followed);
      } catch {
        setIsFollowing(initialIsFollowing);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    void fetchFollowStatus();
  }, [authHydrated, initialIsFollowing, loggedIn, teamId]);

  //======= Toggle Follow =======//
  const handleFollowToggle = async () => {
    if (isLoading || isCheckingStatus) {
      return;
    }

    const installationId = loggedIn ? undefined : getOrCreateInstallationId();

    try {
      setIsLoading(true);

      if (isFollowing) {
        const response = await unfollowEntity({
          entityType: "TEAM",
          entityId: teamId,
          installationId,
        });

        setIsFollowing(false);
        toast.success(response.message);
        return;
      }

      const response = await followEntity({
        entityType: "TEAM",
        entityId: teamId,
        entityName: teamName,
        entityLogo: logo ?? IMAGE.fallback_image,
        notificationEnabled: true,
        installationId,
        metadata: {
          source: "web",
        },
      });

      setIsFollowing(true);
      toast.success(response.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Unable to update follow status.",
        );
        return;
      }

      toast.error("Unable to update follow status.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLabel = isCheckingStatus
    ? "Checking..."
    : isLoading
      ? isFollowing
        ? "Unfollowing..."
        : "Following..."
      : isFollowing
        ? "Following"
        : "Follow";

  return (
    <Button
      type="button"
      size="base"
      rounded="full"
      disabled={isLoading || isCheckingStatus}
      onClick={handleFollowToggle}
      className="px-4"
    >
      {buttonLabel}
    </Button>
  );
}
