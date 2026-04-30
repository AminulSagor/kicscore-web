import { CalendarDays, Grid2X2, MapPin, Radio, Trophy } from "lucide-react";

import Card from "@/components/UI/cards/card";

export default function MatchInfoCard() {
  return (
    <aside className="space-y-5">
      <Card
        variant="white"
        shadow="none"
        className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
      >
        <div className="flex items-start gap-4">
          <Radio className="mt-1 size-5 text-[#6B7A75] dark:text-white/45" />

          <div className="flex-1">
            <h3 className="text-base font-bold">Spotify Camp Nou</h3>
            <p className="text-sm text-[#6B7A75] dark:text-white/55">
              Barcelona, Spain
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Grid2X2 className="size-4 text-[#6B7A75] dark:text-white/45" />
              <div>
                <p className="text-xs text-[#6B7A75] dark:text-white/45">
                  Surface
                </p>
                <p className="text-sm font-bold">Grass</p>
              </div>
            </div>
          </div>

          <span className="flex size-8 items-center justify-center rounded-full bg-[#EAF3EF] text-secondary dark:bg-black/30">
            <MapPin className="size-4" />
          </span>
        </div>
      </Card>

      <Card
        variant="white"
        shadow="none"
        className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
      >
        <div className="space-y-5 text-sm font-semibold">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5 text-[#6B7A75] dark:text-white/45" />
            <span>Thu 9 April, 01:00</span>
          </div>

          <div className="flex items-center gap-3">
            <Trophy className="size-5 text-[#6B7A75] dark:text-white/45" />
            <span>Champions League Quarter-final</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#EAF3EF] text-xs dark:bg-white/10">
              ⚽
            </span>
            <span>🇷🇴 István Kovács</span>
          </div>
        </div>
      </Card>
    </aside>
  );
}
