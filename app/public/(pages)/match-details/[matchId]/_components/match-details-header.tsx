import Image from "next/image";
import { CalendarDays, Trophy } from "lucide-react";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import Button from "@/components/UI/buttons/button";
import { IMAGE } from "@/constants/image.path";

export default function MatchDetailsHeader() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <BackArrowButton />

        <Button type="button" size="base" rounded="full" className="px-7">
          Follow
        </Button>
      </div>
      <div className="relative mt-8">
        <div className="mx-auto flex max-w-[520px] items-center justify-between gap-5 text-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="relative size-16 overflow-hidden rounded-full border border-secondary bg-[#F4F8F6] dark:bg-[#232628]">
              <Image
                src={IMAGE.fc_porto}
                alt="Barcelona logo"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mt-3 text-sm font-semibold text-[#10201B] dark:text-white">
              Barcelona
            </h2>
          </div>

          <div className="flex flex-col items-center">
            <span className="rounded bg-[#0E8F6A] px-2 py-1 text-xs font-bold text-white">
              1st leg
            </span>

            <div className="mt-2 flex items-center gap-3">
              <span className="h-3 w-1 rounded-full bg-red-500" />
              <h1 className="text-4xl font-bold tracking-tight text-[#10201B] dark:text-white">
                0 - 2
              </h1>
            </div>

            <p className="mt-1 text-xs font-medium text-[#6B7A75] dark:text-white/55">
              Full time
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <div className="relative size-16 overflow-hidden rounded-full border border-secondary bg-[#F4F8F6] dark:bg-[#232628]">
              <Image
                src={IMAGE.portugal}
                alt="Atletico Madrid logo"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mt-3 text-sm font-semibold text-secondary">
              Atletico Madrid
            </h2>
          </div>
        </div>

        <div className="mt-7 border-y border-[#DDE8E3] py-3 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#6B7A75] dark:text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              Thu 9 April, 01:00
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Trophy className="size-3.5" />
              Champions League
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
