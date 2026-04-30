"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Button from "@/components/UI/buttons/button";
import DatePickerDialog from "@/components/UI/dialogs/date-picker-dialog";
import {
  fixtureDateGroupsMockData,
  fixtureRoundGroupsMockData,
  fixtureTeamGroupsMockData,
} from "@/mock/league-details/league-fixtures.mock.data";
import type {
  FixtureGroup,
  FixtureViewMode,
} from "@/mock/league-details/league-fixtures.mock.types";
import FixtureDateSeparator from "./fixture-date-separator";
import FixtureMatchRow from "./fixture-match-row";
import CustomSelect from "@/components/UI/select/custom-select";

const modeOptions: { label: string; value: FixtureViewMode }[] = [
  { label: "By date", value: "date" },
  { label: "By round", value: "round" },
  { label: "By team", value: "team" },
];

function getFixtureGroups(mode: FixtureViewMode): FixtureGroup[] {
  if (mode === "round") return fixtureRoundGroupsMockData;
  if (mode === "team") return fixtureTeamGroupsMockData;
  return fixtureDateGroupsMockData;
}

export default function FixturesTab() {
  const [mode, setMode] = useState<FixtureViewMode>("date");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 9));

  const groups = getFixtureGroups(mode);

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-1">
          <div className="w-fit">
            <CustomSelect
              value={mode}
              options={modeOptions}
              onChange={setMode}
            />
          </div>

          {mode === "team" && (
            <button
              type="button"
              className="flex h-9 w-full items-center justify-between rounded-lg bg-[#EAF3EF] px-3 text-sm font-semibold text-[#10201B] dark:bg-[#25302B] dark:text-white"
            >
              <span className="flex items-center gap-2">
                <span className="size-5 rounded-full border border-[#8A98A3]" />
                Arsenal
              </span>
              <ChevronDown size={16} />
            </button>
          )}
        </div>

        {mode === "date" && (
          <Button
            size="base"
            rounded="lg"
            className="h-9 shrink-0 px-4 text-sm font-bold"
            onClick={() => setOpenDatePicker(true)}
          >
            <CalendarDays size={16} />
            Jump to date
          </Button>
        )}
      </div>

      {mode === "date" && (
        <div className="mt-7 flex items-center justify-between">
          <Button size="sm" rounded="lg" className="size-9 p-0">
            <ChevronLeft size={18} />
          </Button>

          <Button size="sm" rounded="lg" className="size-9 p-0">
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <div className="mt-5">
        {groups.map((group) => (
          <div key={group.id}>
            <FixtureDateSeparator label={group.label} />
            {group.matches.map((match) => (
              <FixtureMatchRow key={match.id} match={match} />
            ))}
          </div>
        ))}
      </div>

      {mode === "team" && (
        <div className="mt-6 flex justify-center">
          <Button
            rounded="lg"
            size="base"
            className="h-9 px-5 text-sm font-bold"
          >
            Load More
            <ChevronDown size={16} />
          </Button>
        </div>
      )}

      <DatePickerDialog
        open={openDatePicker}
        selectedDate={selectedDate}
        onOpenChange={setOpenDatePicker}
        onConfirm={setSelectedDate}
        markedDates={["2026-04-09", "2026-04-12", "2026-04-19", "2026-04-29"]}
      />
    </div>
  );
}
