"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

import Card from "@/components/UI/cards/card";
import Dialog from "@/components/UI/dialogs/dialog";
import { deleteAccount } from "@/service/user/profile.service";
import { authStore } from "@/z_store/auth/auth.store";

export default function DangerZoneCard() {
  const router = useRouter();

  const user = authStore((state) => state.user);
  const logout = authStore((state) => state.logout);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isDeleteDisabled =
    !user?.fullName || confirmName.trim() !== user.fullName.trim() || isDeleting;

  const handleDeleteAccount = async () => {
    if (isDeleteDisabled) return;

    try {
      setIsDeleting(true);

      const response = await deleteAccount({
        fullName: confirmName.trim(),
      });

      toast.success(response.message);
      logout();
      router.replace("/public/auth/sign-in");
    } catch {
      toast.error("Unable to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
    setConfirmName("");
  };

  return (
    <>
      <Card
        variant="white"
        shadow="none"
        className="h-fit border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
          Danger Zone
        </h3>

        <button
          type="button"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="mt-8 flex cursor-pointer items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-red"
        >
          <TriangleAlert size={16} />
          Delete Account?
        </button>
      </Card>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        size="sm"
        position="center"
        hideClose
        className="rounded-2xl bg-white dark:bg-[#111d1a]"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
            <TriangleAlert size={22} fill="currentColor" />
          </div>

          <h2 className="mt-5 text-base font-bold uppercase text-[#10201B] dark:text-white">
            Delete Account?
          </h2>

          <p className="mx-auto mt-3 max-w-[230px] text-xs leading-5 text-[#6B7A75] dark:text-white/55">
            This action cannot be undone. You will permanently lose your account
            and saved data.
          </p>

          <div className="mt-6 text-left">
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#10201B]/55 dark:text-white/45">
              Type your name to confirm
            </label>

            <input
              value={confirmName}
              onChange={(event) => setConfirmName(event.target.value)}
              placeholder={user?.fullName || "Enter your full name"}
              className="h-11 w-full rounded-lg border border-[#DDE8E3] bg-white px-4 text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/35 focus:border-red dark:border-white/10 dark:bg-[#0b1512] dark:text-white dark:placeholder:text-white/25"
            />
          </div>

          <button
            type="button"
            disabled={isDeleteDisabled}
            onClick={handleDeleteAccount}
            className="mt-4 h-11 w-full rounded-xl bg-red text-xs font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </button>

          <button
            type="button"
            onClick={handleCloseDialog}
            className="mt-3 h-11 w-full cursor-pointer rounded-xl bg-[#EAF3EF] text-xs font-bold uppercase text-[#6B7A75] transition hover:opacity-80 dark:bg-[#25302B] dark:text-white/60"
          >
            Go Back
          </button>
        </div>
      </Dialog>
    </>
  );
}