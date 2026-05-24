"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import {
  getGroupedMatchesByLeague,
  getMatchesByTime,
} from "@/service/football/matches/match.service";
import {
  GroupedLeagueMatches,
  MatchFixtureItem,
  MatchTabType,
} from "@/types/football/matches/match.types";

import MatchCard from "./match-card";
import MatchToolbar from "./match-toolbar";

const MATCH_LIMIT = 14;

const getDateKey = (date: Date) => date.toISOString().slice(0, 10);

const groupMatchesByLeague = (matches: MatchFixtureItem[]) => {
  const leagueMap = new Map<number, GroupedLeagueMatches>();

  matches.forEach((match) => {
    const existingGroup = leagueMap.get(match.league.id);

    if (!existingGroup) {
      leagueMap.set(match.league.id, {
        league: match.league,
        matchCount: 1,
        fixtures: [match],
      });

      return;
    }

    existingGroup.fixtures.push(match);
    existingGroup.matchCount += 1;
  });

  return Array.from(leagueMap.values());
};

//======= Merge league groups =======//
const mergeMatchGroups = (
  previousGroups: GroupedLeagueMatches[],
  nextGroups: GroupedLeagueMatches[],
) => {
  const groupMap = new Map<number, GroupedLeagueMatches>();

  previousGroups.forEach((group) => {
    groupMap.set(group.league.id, { ...group, fixtures: [...group.fixtures] });
  });

  nextGroups.forEach((group) => {
    const existingGroup = groupMap.get(group.league.id);

    if (!existingGroup) {
      groupMap.set(group.league.id, group);
      return;
    }

    existingGroup.fixtures.push(...group.fixtures);
    existingGroup.matchCount += group.fixtures.length;
  });

  return Array.from(groupMap.values());
};

export default function MatchSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<MatchTabType>("ongoing");
  const [matchGroups, setMatchGroups] = useState<GroupedLeagueMatches[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMatches, setHasMoreMatches] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const selectedDateKey = useMemo(
    () => getDateKey(selectedDate),
    [selectedDate],
  );

  const sortedMatchGroups = useMemo(() => {
    return matchGroups.map((group) => ({
      ...group,
      fixtures: [...group.fixtures].sort((a, b) =>
        sortOrder === "asc"
          ? a.fixture.timestamp - b.fixture.timestamp
          : b.fixture.timestamp - a.fixture.timestamp,
      ),
    }));
  }, [matchGroups, sortOrder]);

  //======= Fetch matches =======//
  useEffect(() => {
    let isMounted = true;

    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        setCurrentPage(1);

        if (activeTab === "ongoing") {
          const response = await getGroupedMatchesByLeague({
            date: selectedDateKey,
            page: 1,
            limit: MATCH_LIMIT,
            statusGroup: "ALL",
          });

          if (isMounted) {
            setMatchGroups(response.items);
            setHasMoreMatches(response.items.length === MATCH_LIMIT);
          }

          return;
        }

        const response = await getMatchesByTime({
          date: selectedDateKey,
          page: 1,
          limit: MATCH_LIMIT,
          statusGroup: "ALL",
        });

        if (isMounted) {
          setMatchGroups(groupMatchesByLeague(response.items));
          setHasMoreMatches(response.items.length === MATCH_LIMIT);
        }
      } catch {
        if (isMounted) {
          setMatchGroups([]);
          setHasMoreMatches(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMatches();

    return () => {
      isMounted = false;
    };
  }, [activeTab, selectedDateKey]);

  //======= Load more matches =======//
  const handleLoadMore = async () => {
    try {
      setIsLoadMoreLoading(true);

      const nextPage = currentPage + 1;

      if (activeTab === "ongoing") {
        const response = await getGroupedMatchesByLeague({
          date: selectedDateKey,
          page: nextPage,
          limit: MATCH_LIMIT,
          statusGroup: "ALL",
        });

        setMatchGroups((prev) => mergeMatchGroups(prev, response.items));
        setHasMoreMatches(response.items.length === MATCH_LIMIT);
        setCurrentPage(nextPage);

        return;
      }

      const response = await getMatchesByTime({
        date: selectedDateKey,
        page: nextPage,
        limit: MATCH_LIMIT,
        statusGroup: "ALL",
      });

      const nextGroups = groupMatchesByLeague(response.items);

      setMatchGroups((prev) => mergeMatchGroups(prev, nextGroups));
      setHasMoreMatches(response.items.length === MATCH_LIMIT);
      setCurrentPage(nextPage);
    } catch {
      setHasMoreMatches(false);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };

  //======= Toggle match sort order =======//
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <section className="mt-8 pb-6">
      <MatchToolbar
        activeTab={activeTab}
        selectedDate={selectedDate}
        sortOrder={sortOrder}
        onDateChange={setSelectedDate}
        onTabChange={setActiveTab}
        onSortToggle={handleSortToggle}
      />

      {isLoading && (
        <div className="grid items-start gap-5 xl:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-34 rounded-3xl bg-[#EAF3EF] dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {!isLoading && matchGroups.length === 0 && (
        <div className="rounded-3xl border border-[#DDE8E3] bg-white px-6 py-12 text-center dark:border-white/10 dark:bg-[#111d1a]">
          <p className="text-sm font-semibold text-[#10201B] dark:text-white">
            No matches found
          </p>
          <p className="mt-2 text-xs text-[#6B7A75] dark:text-white/45">
            Try selecting another date or switching match filter.
          </p>
        </div>
      )}

      {!isLoading && matchGroups.length > 0 && (
        <>
          <div className="columns-1 gap-5 xl:columns-2">
            {sortedMatchGroups.map((group) => (
              <div key={group.league.id} className="mb-5 break-inside-avoid">
                <MatchCard group={group} />
              </div>
            ))}
          </div>

          {hasMoreMatches && (
            <div className="mt-10 flex justify-center">
              <Button
                size="base"
                rounded="md"
                disabled={isLoadMoreLoading}
                className="gap-2 bg-secondary px-5 py-2 text-sm font-semibold text-white hover:bg-secondary/90 cursor-pointer"
                onClick={handleLoadMore}
              >
                {isLoadMoreLoading ? "Loading..." : "Load More"}
                <ChevronDown size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
