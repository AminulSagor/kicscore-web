"use client";

import { Mail, User } from "lucide-react";

import Card from "@/components/UI/cards/card";

interface EditProfileCardProps {
  onChange: () => void;
}

export default function EditProfileCard({ onChange }: EditProfileCardProps) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
        Edit Profile
      </h3>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
            Full Name
          </label>

          <div className="flex h-11 items-center gap-3 rounded-lg border border-transparent bg-[#EAF3EF] px-3 focus-within:border-secondary dark:bg-[#0b1512]">
            <User size={15} className="text-[#10201B]/40 dark:text-white/35" />
            <input
              defaultValue="User"
              onChange={onChange}
              className="h-full w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
            Email Address
          </label>

          <div className="flex h-11 items-center gap-3 rounded-lg bg-[#EAF3EF] px-3 opacity-60 dark:bg-[#0b1512]">
            <Mail size={15} className="text-[#10201B]/40 dark:text-white/35" />
            <input
              disabled
              defaultValue="user@email.com"
              className="h-full w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
