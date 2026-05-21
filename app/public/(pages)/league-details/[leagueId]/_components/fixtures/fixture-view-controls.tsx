"use client";

import { CalendarDays } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import CustomSelect from "@/components/UI/select/custom-select";
import type { FixtureViewMode } from "@/app/public/(pages)/league-details/_utils/fixture-groups.utils";
import type { FixtureTeamOption } from "@/app/public/(pages)/league-details/_utils/fixture-team.utils";

import FixtureTeamSelector from "./fixture-team-selector";

type RoundOption = {
  label: string;
  value: string;
};

type FixtureViewControlsProps = {
  mode: FixtureViewMode;
  roundOptions: RoundOption[];
  teamOptions: FixtureTeamOption[];
  activeRoundId: string | null;
  activeTeamId: string;
  onModeChange: (mode: FixtureViewMode) => void;
  onRoundChange: (roundId: string) => void;
  onTeamChange: (teamId: string) => void;
  onOpenDatePicker: () => void;
};

const modeOptions: { label: string; value: FixtureViewMode }[] = [
  { label: "By date", value: "date" },
  { label: "By round", value: "round" },
  { label: "By team", value: "team" },
];

export default function FixtureViewControls({
  mode,
  roundOptions,
  teamOptions,
  activeRoundId,
  activeTeamId,
  onModeChange,
  onRoundChange,
  onTeamChange,
  onOpenDatePicker,
}: FixtureViewControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-1">
        <div className="w-fit">
          <CustomSelect
            value={mode}
            options={modeOptions}
            onChange={onModeChange}
          />
        </div>

        {mode === "team" && (
          <FixtureTeamSelector
            value={activeTeamId}
            options={teamOptions}
            onChange={onTeamChange}
          />
        )}
      </div>

      {mode === "date" && (
        <Button
          size="base"
          rounded="lg"
          className="h-9 shrink-0 px-4 text-sm font-bold"
          onClick={onOpenDatePicker}
        >
          <CalendarDays size={16} />
          Jump to date
        </Button>
      )}

      {mode === "round" && activeRoundId && (
        <CustomSelect
          value={activeRoundId}
          options={roundOptions}
          onChange={onRoundChange}
          className="shrink-0"
          buttonClassName="h-9 rounded-lg"
          menuClassName="right-0 left-auto min-w-[120px]"
        />
      )}
    </div>
  );
}
