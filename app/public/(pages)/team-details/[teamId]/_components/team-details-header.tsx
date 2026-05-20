"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
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
  country: string;
  logo?: string;
};

export default function TeamDetailsHeader({
  teamId,
  teamName,
  country,
  logo,
}: Props) {
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
          entityType: "TEAM",
          entityId: teamId,
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
  }, [authHydrated, loggedIn, teamId]);

  const handleFollowToggle = async () => {
    if (isLoading || isCheckingStatus) return;

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
        entityLogo: logo ?? IMAGE.arsenal,
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
    <div>
      <BackArrowButton />

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-secondary bg-[#F3F7F5] dark:bg-primary">
          <Image
            src={logo ?? IMAGE.arsenal}
            alt={`${teamName} logo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-[#10201B] dark:text-white">
            {teamName}
          </h1>
          <p className="text-sm text-[#6B7A75] dark:text-white/60">{country}</p>

          <div className="mt-3">
            <Button
              type="button"
              size="base"
              rounded="full"
              disabled={isLoading || isCheckingStatus}
              onClick={handleFollowToggle}
              className="px-4"
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
        </div>
      </div>
    </div>
  );
}