"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type {
    FollowingPopupType,
    FollowingTabKey,
} from "@/mock/user/following/following.mock.types";
import UnfollowConfirmDialog from "./unfollow-confirm-dialog";

type FollowingRowProps = {
    name: string;
    type: FollowingTabKey;
    popupType?: FollowingPopupType;
    iconLabel: string;
    subtitle?: string;
    image?: string;
    showFollowButton?: boolean;
};

const FollowingRow = ({
    name,
    type,
    popupType,
    iconLabel,
    subtitle,
    image,
    showFollowButton = false,
}: FollowingRowProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                onClick={() => {
                    if (!showFollowButton) setIsDialogOpen(true);
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-4 shadow-sm transition hover:bg-[#F2F7F5] dark:bg-white/5 dark:hover:bg-white/8"
            >
                <div className="flex items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008A63] bg-[#1F2926] text-xs font-bold text-[#79e2c5]">
                        {image ? (
                            <Image src={image} alt={name} fill className="object-cover" />
                        ) : (
                            iconLabel.slice(0, 1)
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#0B1F1A] dark:text-white">
                            {name}
                        </p>

                        {subtitle && (
                            <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {showFollowButton ? (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDialogOpen(true);
                        }}
                        className="rounded-full bg-[#34D399] px-4 py-2 text-xs font-bold text-[#07110F] transition hover:bg-[#25C28A]"
                    >
                        Follow
                    </button>
                ) : (
                    <ChevronRight className="h-4 w-4 text-[#61736D] dark:text-white/45" />
                )}
            </div>

            <UnfollowConfirmDialog
                type={popupType ?? type}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default FollowingRow;