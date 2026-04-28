"use client";

import { Ruler } from "lucide-react";
import { useState } from "react";

import Card from "@/components/UI/cards/card";

interface GeneralSettingsCardProps {
  onChange: () => void;
}

export default function GeneralSettingsCard({
  onChange,
}: GeneralSettingsCardProps) {
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
        General Settings
      </h3>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm">Match Alerts</span>

          <button
            type="button"
            onClick={() => {
              setMatchAlerts((prev) => !prev);
              onChange();
            }}
            className={`flex h-5 w-9 items-center rounded-full p-1 transition ${
              matchAlerts ? "bg-mint-green" : "bg-[#DDE8E3] dark:bg-white/15"
            }`}
          >
            <span
              className={`h-3 w-3 rounded-full bg-white transition ${
                matchAlerts ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-[#DDE8E3] pt-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF3EF] dark:bg-[#25302B]">
              <Ruler size={14} />
            </span>
            <span className="text-sm">Units</span>
          </div>

          <div className="flex rounded-lg bg-[#EAF3EF] p-1 dark:bg-[#25302B]">
            {(["metric", "imperial"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setUnit(item);
                  onChange();
                }}
                className={`rounded-md px-4 py-1 text-xs font-semibold capitalize transition ${
                  unit === item
                    ? "bg-secondary text-white"
                    : "text-[#6B7A75] dark:text-white/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
