"use client";

import { IMAGE } from "@/constants/image.path";
import Image from "next/image";

export default function UserAvatar() {
  return (
    <button className="flex h-9 w-9 items-center justify-center">
      <Image
        src={IMAGE.profile_image}
        alt="Profile"
        width={36}
        height={36}
        className="h-9 w-9 rounded-full border-2 border-[#72e3c6] object-cover"
      />
    </button>
  );
}
