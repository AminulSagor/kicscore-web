"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

import { unfollowEntity } from "@/service/follows/follow.service";
import { FollowEntityType } from "@/types/follows/follow.types";

type UnfollowConfirmDialogProps = {
    entityType: FollowEntityType;
    entityId: string;
    open: boolean;
    onClose: () => void;
    onUnfollowSuccess?: (entityType: FollowEntityType, entityId: string) => void;
};

const getDialogContent = (entityType: FollowEntityType) => {
    if (entityType === "PLAYER") {
        return {
            label: "Player",
            description: "You won’t get any notification about this player afterwards",
        };
    }

    if (entityType === "TEAM") {
        return {
            label: "Team",
            description: "You won’t get any notification about this team afterwards",
        };
    }

    if (entityType === "FIXTURE") {
        return {
            label: "Team vs Team",
            description: "You won’t get any notification on these afterwards",
        };
    }

    if (entityType === "COACH") {
        return {
            label: "Coach",
            description: "You won’t get any notification about this coach afterwards",
        };
    }

    return {
        label: "League",
        description: "You won’t get any notification about this league afterwards",
    };
};

const UnfollowConfirmDialog = ({
    entityType,
    entityId,
    open,
    onClose,
    onUnfollowSuccess,
}: UnfollowConfirmDialogProps) => {
    const [isUnfollowing, setIsUnfollowing] = useState(false);

    if (!open) return null;

    const content = getDialogContent(entityType);

    const handleUnfollow = async () => {
        try {
            setIsUnfollowing(true);

            const response = await unfollowEntity({
                entityType,
                entityId,
            });

            toast.success(response.message);
            onUnfollowSuccess?.(entityType, entityId);
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Unable to unfollow.");
                return;
            }

            toast.error("Unable to unfollow.");
        } finally {
            setIsUnfollowing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm dark:bg-black/70">
            <div className="w-full max-w-[280px] rounded-3xl border border-[#D8E7DF] bg-white px-6 py-7 text-center shadow-2xl dark:border-white/8 dark:bg-[#15211D]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFB020]/15">
                    <AlertTriangle className="h-8 w-8 fill-[#FFB020] text-[#15211D]" />
                </div>

                <h2 className="mt-6 text-xl font-extrabold text-[#0B1F1A] dark:text-white">
                    ARE YOU SURE?
                </h2>

                <p className="mt-3 text-xs text-[#61736D] dark:text-white/55">
                    {content.label}
                </p>

                <p className="mx-auto mt-5 max-w-[210px] text-xs leading-5 text-[#61736D] dark:text-white/55">
                    {content.description}
                </p>

                <div className="mt-6 space-y-3">
                    <button
                        type="button"
                        disabled={isUnfollowing}
                        onClick={handleUnfollow}
                        className="w-full cursor-pointer rounded-full bg-[#FF9800] py-3 text-xs font-bold text-[#07110F] transition hover:bg-[#f08f00] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isUnfollowing ? "Unfollowing..." : "Unfollow"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full cursor-pointer rounded-full bg-[#EAF3EF] py-3 text-xs font-bold text-[#61736D] transition hover:bg-[#DDEBE5] dark:bg-white/6 dark:text-white/70 dark:hover:bg-white/10"
                    >
                        GO BACK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnfollowConfirmDialog;