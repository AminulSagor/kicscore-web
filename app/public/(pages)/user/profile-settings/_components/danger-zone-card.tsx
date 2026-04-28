"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";

import Card from "@/components/UI/cards/card";
import Dialog from "@/components/UI/dialogs/dialog";

export default function DangerZoneCard() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

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
          className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-red cursor-pointer"
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
            This action cannot be undone. You will permanently lose all your
            progress, including the page you follow
          </p>

          <div className="mt-6 text-left">
            <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#10201B]/55 dark:text-white/45">
              Type your name to confirm
            </label>

            <input
              value={confirmName}
              onChange={(event) => setConfirmName(event.target.value)}
              placeholder="Enter your full name"
              className="h-11 w-full rounded-lg border border-[#DDE8E3] bg-white px-4 text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/35 focus:border-red dark:border-white/10 dark:bg-[#0b1512] dark:text-white dark:placeholder:text-white/25"
            />
          </div>

          <button
            type="button"
            className="mt-4 h-11 w-full bg-red text-xs font-bold uppercase rounded-xl"
          >
            Delete Permanently
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(false)}
            className="mt-3 h-11 w-full rounded-xl bg-[#EAF3EF] text-xs font-bold uppercase text-[#6B7A75] transition hover:opacity-80 dark:bg-[#25302B] dark:text-white/60"
          >
            Go Back
          </button>
        </div>
      </Dialog>
    </>
  );
}
