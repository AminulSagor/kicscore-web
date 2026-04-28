"use client";

import { Camera, UserPlus } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";

export default function CreateManagerCard() {
  return (
    <Card
      variant="white"
      shadow="none"
      className="mt-8 border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div>
        <h2 className="text-base font-bold">Create Manager Account</h2>
        <p className="mt-1 text-sm text-[#6B7A75] dark:text-white/45">
          Provision a new administrative user with managerial privileges.
        </p>
      </div>

      <div className="my-5 h-px bg-[#DDE8E3] dark:bg-white/10" />

      <div className="grid gap-8 lg:grid-cols-[140px_1fr]">
        <div>
          <button
            type="button"
            className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#EAF3EF] text-[#6B7A75] dark:bg-[#25302B] dark:text-white/50"
          >
            <Camera size={28} />
            <span className="mt-2 text-xs font-bold uppercase tracking-[0.15em]">
              Upload
            </span>
          </button>

          <p className="mt-4 max-w-[120px] text-xs leading-5 text-[#6B7A75] dark:text-white/45">
            JPEG or PNG. Max 5MB. Circular crop applied.
          </p>
        </div>

        <div className="max-w-[560px] space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah Smith"
              className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm outline-none focus:border-secondary dark:border-white/15 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/35"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@kicscore.com"
              className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm outline-none focus:border-secondary dark:border-white/15 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/35"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm outline-none focus:border-secondary dark:border-white/15 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/35"
            />
          </div>

          <Button size="base" className="mt-5 text-xs font-bold">
            <UserPlus size={14} />
            Create Account
          </Button>
        </div>
      </div>
    </Card>
  );
}
