"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { CoachDetailsMock } from "@/mock/coach-details/coach-details.mock.types";
import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import {
  followEntity,
  getFollowStatus,
  unfollowEntity,
} from "@/service/follows/follow.service";
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";
import { authStore } from "@/z_store/auth/auth.store";

type CoachProfileHeaderProps = {
  coach: CoachDetailsMock;
};

const CoachProfileHeader = ({ coach }: CoachProfileHeaderProps) => {
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
          entityType: "COACH",
          entityId: coach.id,
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
  }, [authHydrated, loggedIn, coach.id]);

  const handleFollowToggle = async () => {
    if (isLoading || isCheckingStatus) return;

    const installationId = loggedIn ? undefined : getOrCreateInstallationId();

    try {
      setIsLoading(true);

      if (isFollowing) {
        const response = await unfollowEntity({
          entityType: "COACH",
          entityId: coach.id,
          installationId,
        });

        setIsFollowing(false);
        toast.success(response.message);
        return;
      }

      const response = await followEntity({
        entityType: "COACH",
        entityId: coach.id,
        entityName: coach.name,
        entityLogo: coach.avatar ?? null,
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
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008A63] bg-[#1F2926] text-xs font-bold text-[#79e2c5]">
          {coach.avatar ? (
            <Image
              src={coach.avatar}
              alt={coach.name}
              fill
              className="object-cover"
            />
          ) : (
            coach.name.slice(0, 1)
          )}
        </div>

        <div>
          <h1 className="text-lg font-bold">{coach.name}</h1>
          <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
            {coach.role}
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

export default CoachProfileHeader;