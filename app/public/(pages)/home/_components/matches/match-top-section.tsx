"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getLiveFixtures } from "@/service/football/fixtures/live.fixture.service";
import { getUpcomingFixturesClient } from "@/service/football/fixtures/upcoming.client.service";
import { LiveFixtureItem, LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";

import LiveMatchCard from "./live-match-card";
import LiveMatchCardSkeleton from "./live-match-card-skeleton";
import UpcomingMatchCard from "./upcoming-match-card";

const MatchTopSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [liveMatches, setLiveMatches] = useState<LiveFixtureItem[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<LeagueFixtureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //======= Fetch live matches =======//
  useEffect(() => {
    let isMounted = true;

    const fetchLiveMatches = async () => {
      try {
        setIsLoading(true);

        const liveData = await getLiveFixtures();

        if (isMounted && liveData.response && liveData.response.length > 0) {
          setLiveMatches(liveData.response);
          setIsLoading(false);
          return;
        }

        // No live matches — fetch upcoming as a fallback
        const upcomingData = await getUpcomingFixturesClient(6);

        if (isMounted) {
          setLiveMatches([]);
          setUpcomingMatches(upcomingData.response || []);
        }
      } catch {
        if (isMounted) {
          setLiveMatches([]);
          setUpcomingMatches([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLiveMatches();

    return () => {
      isMounted = false;
    };
  }, []);

  //======= Slide carousel =======//
  const handleSlide = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollBy({
      left:
        direction === "left" ? -container.clientWidth : container.clientWidth,
      behavior: "smooth",
    });
  };

  const isShowingLive = !isLoading && liveMatches.length > 0;
  const isShowingUpcoming = !isLoading && liveMatches.length === 0 && upcomingMatches.length > 0;

  return (
    <section className="space-y-3 overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-foreground">
          {isShowingLive ? "Live Now" : isShowingUpcoming ? "Upcoming" : "Live Now"}
        </h2>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
            {isShowingLive ? `${liveMatches.length} Live` : isShowingUpcoming ? `${upcomingMatches.length} Upcoming` : `${liveMatches.length} Live`}
          </span>

          <button
            type="button"
            onClick={() => handleSlide("left")}
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-white transition hover:opacity-85"
            aria-label="Previous matches"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleSlide("right")}
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-white transition hover:opacity-85"
            aria-label="Next matches"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="
          flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <LiveMatchCardSkeleton key={index} />
          ))
        ) : isShowingLive ? (
          liveMatches.map((match) => (
            <LiveMatchCard key={match.fixture.id} match={match} />
          ))
        ) : isShowingUpcoming ? (
          upcomingMatches.map((match) => (
            <UpcomingMatchCard key={match.fixture.id} match={match} />
          ))
        ) : (
          <div className="min-h-[130px] w-full shrink-0 rounded-3xl border border-[#DDE8E3] bg-white px-6 py-12 text-center dark:border-white/10 dark:bg-[#111d1a]">
            <p className="text-sm font-semibold text-[#10201B] dark:text-white">
              No live matches right now
            </p>
            <p className="mt-2 text-xs text-[#6B7A75] dark:text-white/45">
              Live matches will appear here once they start.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchTopSection;
