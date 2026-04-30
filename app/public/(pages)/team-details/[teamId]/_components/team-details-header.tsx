"use client";

import Image from "next/image";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import Button from "@/components/UI/buttons/button";
import { IMAGE } from "@/constants/image.path";

type Props = {
  teamName: string;
  country: string;
  logo?: string;
};

export default function TeamDetailsHeader({ teamName, country, logo }: Props) {
  return (
    <div>
      <BackArrowButton />

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-secondary bg-[#F3F7F5] dark:bg-primary">
          <Image
            src={logo ?? IMAGE.arsenal}
            alt={`${teamName} logo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-[#10201B] dark:text-white">
            {teamName}
          </h1>
          <p className="text-sm text-[#6B7A75] dark:text-white/60">{country}</p>

          <div className="mt-3">
            <Button size="base" rounded="full" className="px-4" >Follow</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
