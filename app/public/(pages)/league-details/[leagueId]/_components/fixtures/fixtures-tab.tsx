"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import DatePickerDialog from "@/components/UI/dialogs/date-picker-dialog";
import type {
  LeagueFixtureItem,
  LeagueFixturesBackendPaging,
} from "@/types/football/fixtures/fixture.types";
import {
  formatDateKey,
  parseFixtureDate,
} from "@/app/public/(pages)/league-details/_utils/fixture-date.utils";
import {
  getFixtureGroups,
  type FixtureViewMode,
} from "@/app/public/(pages)/league-details/_utils/fixture-groups.utils";
import {
  ALL_TEAMS_VALUE,
  filterFixturesByTeam,
  getFixtureTeamOptions,
} from "@/app/public/(pages)/league-details/_utils/fixture-team.utils";

import FixtureDateSeparator from "./fixture-date-separator";
import FixtureMatchRow from "./fixture-match-row";
import FixtureViewControls from "./fixture-view-controls";

type FixturesTabProps = {
  fixtures: LeagueFixtureItem[];
  pagination?: LeagueFixturesBackendPaging;
  selectedSeason: string;
};

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
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState(ALL_TEAMS_VALUE);

  const selectedDateFromQuery = searchParams.get("fixtureDate");

  const selectedDate = useMemo(() => {
    if (selectedDateFromQuery) {
      const parsedDate = parseFixtureDate(
        selectedDateFromQuery,
        selectedSeasonYear,
      );

      if (parsedDate) return parsedDate;
    }

    const today = new Date();

    return new Date(selectedSeasonYear, today.getMonth(), today.getDate());
  }, [selectedDateFromQuery, selectedSeasonYear]);

  const teamOptions = useMemo(
    () => getFixtureTeamOptions(fixtures),
    [fixtures],
  );

  const activeTeamId = useMemo(() => {
    const selectedTeamExists = teamOptions.some(
      (option) => option.value === selectedTeamId,
    );

    return selectedTeamExists ? selectedTeamId : ALL_TEAMS_VALUE;
  }, [selectedTeamId, teamOptions]);

  const visibleFixtures = useMemo(() => {
    if (mode !== "team") return fixtures;

    return filterFixturesByTeam(fixtures, activeTeamId);
  }, [activeTeamId, fixtures, mode]);

  const groups = useMemo(
    () => getFixtureGroups(visibleFixtures, mode),
    [visibleFixtures, mode],
  );

  const roundOptions = useMemo(() => {
    if (mode !== "round") return [];

    return groups.map((group) => ({
      label: group.label,
      value: String(group.id),
    }));
  }, [groups, mode]);

  const activeRoundId = useMemo(() => {
    if (mode !== "round" || roundOptions.length === 0) return null;

    const selectedRoundExists = selectedRoundId
      ? roundOptions.some((option) => option.value === selectedRoundId)
      : false;

    return selectedRoundExists ? selectedRoundId : roundOptions[0].value;
  }, [mode, roundOptions, selectedRoundId]);

  const displayedGroups = useMemo(() => {
    if (mode !== "round" || !activeRoundId) return groups;

    return groups.filter((group) => String(group.id) === activeRoundId);
  }, [activeRoundId, groups, mode]);

  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", "fixtures");
    params.set("fixturePage", String(page));

    router.push(`?${params.toString()}`);
  };

  const handleDateConfirm = (date: Date) => {
    const selectedFixtureDate = new Date(
      selectedSeasonYear,
      date.getMonth(),
      date.getDate(),
    );

    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", "fixtures");
    params.set("fixturePage", "1");
    params.set("fixtureDate", formatDateKey(selectedFixtureDate));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <FixtureViewControls
        mode={mode}
        roundOptions={roundOptions}
        teamOptions={teamOptions}
        activeRoundId={activeRoundId}
        activeTeamId={activeTeamId}
        onModeChange={setMode}
        onRoundChange={setSelectedRoundId}
        onTeamChange={setSelectedTeamId}
        onOpenDatePicker={() => setOpenDatePicker(true)}
      />

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
        {displayedGroups.length > 0 ? (
          displayedGroups.map((group) => (
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
        lockedYear={selectedSeasonYear}
      />
    </div>
  );
}
