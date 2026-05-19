"use client";

import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Accordion from "@/components/UI/accordion/accordion";
import { getCurrentLeagues } from "@/service/football/leagues/league.service";
import { FootballLeagueItem } from "@/types/football/leagues/league.types";
import { getValidImage } from "@/utils/image.utils";

const TOP_LEAGUE_IDS = [
  1, // FIFA World Cup
  2, // Champions League
  39, // Premier League
  140, // La Liga
  78, // Bundesliga
  135, // Serie A
  61, // Ligue 1
  3, // Europa League
  4, // UEFA Euro
  253, // MLS
];

//======= Get country display name =======//
const getCountryName = (league: FootballLeagueItem) => {
  return league.country.name === "World"
    ? "International"
    : league.country.name;
};

export default function LeagueSidebar() {
  const [leagues, setLeagues] = useState<FootballLeagueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [openCountry, setOpenCountry] = useState<string | null>(null);

  //======= Fetch leagues =======//
  useEffect(() => {
    let isMounted = true;

    const fetchLeagues = async () => {
      try {
        setIsLoading(true);

        const data = await getCurrentLeagues();

        if (isMounted) {
          setLeagues(data);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLeagues();

    return () => {
      isMounted = false;
    };
  }, []);

  //======= Prepare top leagues =======//
  const topLeagues = useMemo(() => {
    return TOP_LEAGUE_IDS.map((id) =>
      leagues.find((item) => item.league.id === id),
    ).filter((item): item is FootballLeagueItem => Boolean(item));
  }, [leagues]);

  //======= Group leagues by country =======//
  const groupedCountries = useMemo(() => {
    const searchValue = filterText.toLowerCase().trim();
    const countryMap = new Map<string, FootballLeagueItem[]>();

    leagues.forEach((item) => {
      const countryName = getCountryName(item);

      if (
        searchValue &&
        !countryName.toLowerCase().includes(searchValue) &&
        !item.league.name.toLowerCase().includes(searchValue)
      ) {
        return;
      }

      const existingLeagues = countryMap.get(countryName) ?? [];
      countryMap.set(countryName, [...existingLeagues, item]);
    });

    return Array.from(countryMap.entries())
      .map(([countryName, countryLeagues]) => ({
        countryName,
        flag: countryLeagues[0]?.country.flag,
        leagues: countryLeagues,
      }))
      .sort((a, b) => a.countryName.localeCompare(b.countryName));
  }, [filterText, leagues]);

  //======= Toggle country leagues =======//
  const handleCountryToggle = (countryName: string) => {
    setOpenCountry((prev) => (prev === countryName ? null : countryName));
  };

  return (
    <aside className="w-full lg:w-[240px] xl:w-[280px]">
      <Accordion title="Top Leagues" defaultOpen>
        <div className="space-y-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 rounded-lg bg-[#EAF3EF] dark:bg-white/5"
                />
              ))
            : topLeagues.map((item) => (
                <Link
                  key={item.league.id}
                  href={`/public/league-details/${item.league.id}`}
                  className="
                    flex w-full items-center gap-3 rounded-lg px-2 py-2
                    text-left text-sm font-semibold text-[#10201B]
                    transition hover:bg-[#EAF3EF]
                    dark:text-white dark:hover:bg-white/5
                  "
                >
                  <span className="relative flex size-5 items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={getValidImage(item.league.logo)}
                      alt={item.league.name}
                      width={20}
                      height={20}
                      className="size-5 object-contain"
                    />
                  </span>

                  <span>{item.league.name}</span>
                </Link>
              ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
            All leagues
          </h3>

          <div
            className="
              mt-3 flex h-9 items-center gap-2 rounded-lg
              bg-[#EAF3EF] px-3 text-[#6B7A75]
              dark:bg-white/5 dark:text-white/45
            "
          >
            <Search size={16} />
            <input
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
              placeholder="Filter"
              className="
                w-full bg-transparent text-sm outline-none
                placeholder:text-[#6B7A75] dark:placeholder:text-white/45
              "
            />
          </div>

          <div className="mt-4 max-h-[430px] space-y-1 overflow-y-auto pr-1">
            {groupedCountries.map((country) => {
              const isOpen = openCountry === country.countryName;

              return (
                <div key={country.countryName}>
                  <button
                    type="button"
                    onClick={() => handleCountryToggle(country.countryName)}
                    className="
                      flex w-full items-center justify-between rounded-lg px-2 py-2.5
                      text-left transition hover:bg-[#EAF3EF]
                      dark:hover:bg-white/5
                    "
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative flex size-4 items-center justify-center overflow-hidden rounded-full">
                        <Image
                          src={getValidImage(country.flag)}
                          alt={country.countryName}
                          width={16}
                          height={16}
                          className="size-4 rounded-full object-cover"
                        />
                      </span>

                      <span className="text-sm font-medium text-[#10201B] dark:text-white">
                        {country.countryName}
                      </span>
                    </div>

                    <ChevronDown
                      size={14}
                      className={`
                        text-[#6B7A75] opacity-60 transition
                        dark:text-white/35
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {isOpen && (
                    <div className="ml-7 mt-1 space-y-1 pb-2">
                      {country.leagues.map((item) => (
                        <Link
                          key={item.league.id}
                          href={`/public/league-details/${item.league.id}`}
                          className="
                            flex items-center gap-2 rounded-md px-2 py-1.5
                            text-xs font-medium text-[#10201B]/75
                            transition hover:bg-[#EAF3EF] hover:text-[#10201B]
                            dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white
                          "
                        >
                          <span className="relative flex size-4 items-center justify-center overflow-hidden rounded-full">
                            <Image
                              src={getValidImage(item.league.logo)}
                              alt={item.league.name}
                              width={16}
                              height={16}
                              className="size-4 object-contain"
                            />
                          </span>

                          <span>{item.league.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Accordion>
    </aside>
  );
}
