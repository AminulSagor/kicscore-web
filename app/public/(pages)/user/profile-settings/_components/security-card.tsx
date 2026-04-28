"use client";

import { Lock, RotateCcw } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";

interface SecurityCardProps {
  onChange: () => void;
}

export default function SecurityCard({ onChange }: SecurityCardProps) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
          Security
        </h3>

        <Button rounded="full" size="sm" className="text-xs font-bold">
          Modify
        </Button>
      </div>

      <div className="mt-5 space-y-4 rounded-xl bg-[#EAF3EF] p-4 dark:bg-[#101915]">
        {[
          { label: "Old Password", icon: Lock },
          { label: "New Password", icon: RotateCcw },
          { label: "Confirm Password", icon: RotateCcw },
        ].map(({ label, icon: Icon }) => (
          <div key={label}>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
              {label}
            </label>

            <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
              <Icon
                size={14}
                className="text-[#10201B]/35 dark:text-white/35"
              />
              <input
                type="password"
                placeholder="••••••••••••"
                onChange={onChange}
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/40 dark:placeholder:text-white/50"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="text-xs font-bold uppercase tracking-[0.16em] text-secondary"
        >
          Forgot Password?
        </button>
      </div>
    </Card>
  );
}
