"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Button from "@/components/UI/buttons/button";
import DatePickerDialog from "@/components/UI/dialogs/date-picker-dialog";
import CustomSelect from "@/components/UI/select/custom-select";
import type {
  LeagueFixtureItem,
  LeagueFixturesBackendPaging,
} from "@/types/football/fixtures/fixture.types";
import FixtureDateSeparator from "./fixture-date-separator";
import FixtureMatchRow from "./fixture-match-row";
import {
  FixtureViewMode,
  getFixtureGroups,
} from "@/app/public/(pages)/league-details/_utils/fixture-groups.utils";

type FixturesTabProps = {
  fixtures: LeagueFixtureItem[];
  pagination?: LeagueFixturesBackendPaging;
  selectedSeason: string;
};

const modeOptions: { label: string; value: FixtureViewMode }[] = [
  { label: "By date", value: "date" },
  { label: "By round", value: "round" },
  { label: "By team", value: "team" },
];

export default function FixturesTab({
  fixtures,
  pagination,
  selectedSeason,
}: FixturesTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSeasonYear = Number(selectedSeason) || new Date().getFullYear();

  const [mode, setMode] = useState<FixtureViewMode>("date");
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const selectedDateFromQuery = searchParams.get("fixtureDate");

  const [selectedDate, setSelectedDate] = useState(
    selectedDateFromQuery
      ? new Date(selectedDateFromQuery)
      : new Date(
          selectedSeasonYear,
          new Date().getMonth(),
          new Date().getDate(),
        ),
  );

  const groups = getFixtureGroups(fixtures, mode);
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", "fixtures");
    params.set("fixturePage", String(page));

    router.push(`?${params.toString()}`);
  };

  const handleDateConfirm = (date: Date) => {
    const selectedDateWithSeason = new Date(
      selectedSeasonYear,
      date.getMonth(),
      date.getDate(),
    );

    setSelectedDate(selectedDateWithSeason);

    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", "fixtures");
    params.set("fixturePage", "1");
    params.set(
      "fixtureDate",
      selectedDateWithSeason.toISOString().split("T")[0],
    );

    router.push(`?${params.toString()}`);
  };

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
                All Teams
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
          <Button
            size="sm"
            rounded="lg"
            className="size-9 p-0"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            size="sm"
            rounded="lg"
            className="size-9 p-0"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <div className="mt-5">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id}>
              <FixtureDateSeparator label={group.label} />

              {group.matches.map((match) => (
                <Link
                  href={`/public/match-details/${match.fixture.id}`}
                  key={match.fixture.id}
                >
                  <FixtureMatchRow match={match} />
                </Link>
              ))}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm font-medium text-[#6B7A75] dark:text-white/50">
              No fixtures found
            </p>
          </div>
        )}
      </div>

      {mode === "team" && (
        <div className="mt-6 flex justify-center">
          <Button
            rounded="lg"
            size="base"
            className="h-9 px-5 text-sm font-bold"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
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
        onConfirm={handleDateConfirm}
        markedDates={fixtures.map((fixture) =>
          fixture.fixture.date.slice(0, 10),
        )}
        enableMonthPicker
        lockedYear={selectedSeasonYear}
      />
    </div>
  );
}
