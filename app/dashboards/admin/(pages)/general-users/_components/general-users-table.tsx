"use client";

import axios from "axios";
import { Ban, RotateCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Card from "@/components/UI/cards/card";
import {
  deleteGeneralUser,
  updateGeneralUserStatus,
} from "@/service/admin/general-users/general.users.client.service";
import type {
  AdminUserStatus,
  GeneralUserTableItem,
} from "@/types/admin/general-users/general.users.types";

interface GeneralUsersTableProps {
  users: GeneralUserTableItem[];
}

type PendingAction = {
  userId: string;
  type: "status" | "delete";
} | null;

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
};

export default function GeneralUsersTable({ users }: GeneralUsersTableProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const handleStatusToggle = async (user: GeneralUserTableItem) => {
    if (pendingAction) {
      return;
    }

    const nextStatus: AdminUserStatus =
      user.status === "active" ? "SUSPENDED" : "ACTIVE";

    try {
      setPendingAction({
        userId: user.id,
        type: "status",
      });

      const response = await updateGeneralUserStatus(user.id, {
        status: nextStatus,
      });

      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Unable to update the user status."),
      );
    } finally {
      setPendingAction(null);
    }
  };

  const handleDelete = async (user: GeneralUserTableItem) => {
    if (pendingAction) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setPendingAction({
        userId: user.id,
        type: "delete",
      });

      const response = await deleteGeneralUser(user.id);

      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete the user."));
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="mt-6 overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead className="bg-[#EAF3EF] dark:bg-[#1d2c27]">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                User
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Email Address
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Status
              </th>
              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              const isPending = pendingAction?.userId === user.id;

              return (
                <tr
                  key={user.id}
                  className={`${index % 2 === 0
                      ? "bg-white dark:bg-[#101c19]"
                      : "bg-[#F6FAF8] dark:bg-[#0d1714]"
                    }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#EAF3EF] text-sm font-bold text-secondary dark:bg-[#1d2c27] dark:text-mint-green">
                        {user.avatarInitial}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold">{user.name}</h3>
                        <p className="text-xs text-[#6B7A75] dark:text-white/45">
                          Joined {user.joinedDate}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#10201B]/80 dark:text-white/75">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-3 py-1 text-xs font-bold capitalize ${user.status === "active"
                          ? "bg-secondary/15 text-secondary dark:bg-secondary/20 dark:text-mint-green"
                          : "bg-red/15 text-red dark:bg-red/25"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleStatusToggle(user)}
                        aria-label={
                          user.status === "blocked"
                            ? `Activate ${user.name}`
                            : `Suspend ${user.name}`
                        }
                        className="text-[#6B7A75] transition hover:text-secondary dark:text-white/55 dark:hover:text-mint-green disabled:pointer-events-none"
                      >
                        {user.status === "blocked" ? (
                          <RotateCcw size={17} />
                        ) : (
                          <Ban size={17} />
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(user)}
                        aria-label={`Delete ${user.name}`}
                        className="text-[#6B7A75] transition hover:text-red dark:text-white/55 disabled:pointer-events-none"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}