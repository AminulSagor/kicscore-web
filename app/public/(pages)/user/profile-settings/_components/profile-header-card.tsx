"use client";

import { Camera } from "lucide-react";
import Image from "next/image";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";

export default function ProfileHeaderCard() {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={IMAGE.profile_image}
              alt="User"
              width={68}
              height={68}
              className="h-[68px] w-[68px] rounded-full border-2 border-white object-cover dark:border-white"
            />

            <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white">
              <Camera size={10} />
            </span>
          </div>

          <div>
            <h2 className="text-sm font-bold">User</h2>
            <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/60">
              user@email.com
            </p>
          </div>
        </div>

        <Button rounded="full" size="sm" className="text-xs font-semibold">
          Change Photo
        </Button>
      </div>
    </Card>
  );
}