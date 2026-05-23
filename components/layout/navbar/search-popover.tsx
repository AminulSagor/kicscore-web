"use client";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Card from "@/components/UI/cards/card";
import type {
  FootballSearchResult,
  SearchCategory,
} from "@/types/search/football-search.types";

const categories: { label: string; value: SearchCategory }[] = [
  { label: "All", value: "all" },
  { label: "Teams", value: "teams" },
  { label: "Leagues", value: "leagues" },
  { label: "Players", value: "players" },
];

interface SearchPopoverProps {
  query: string;
  activeCategory: SearchCategory;
  results: FootballSearchResult[];
  error: string | null;
  isLoading: boolean;
  minimumQueryLength: number;
  onCategoryChange: (category: SearchCategory) => void;
  onResultSelect: () => void;
  popoverWidth?: "desktop" | "mobile";
}

export default function SearchPopover({
  query,
  activeCategory,
  results,
  error,
  isLoading,
  minimumQueryLength,
  onCategoryChange,
  onResultSelect,
  popoverWidth = "desktop",
}: SearchPopoverProps) {
  const trimmedQuery = query.trim();
  const isQueryEmpty = trimmedQuery.length === 0;
  const isQueryTooShort =
    trimmedQuery.length > 0 && trimmedQuery.length < minimumQueryLength;

  return (
    <Card
      variant="white"
      shadow="lg"
      className={`
        absolute left-0 top-14 z-50
        ${popoverWidth === "mobile" ? "w-full!" : "w-[min(calc(100vw-32px),560px)]!"}
        border border-[#DDE8E3] bg-white text-[#10201B]
        dark:border-white/10 dark:bg-[#111d1a] dark:text-white
      `}
    >
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onCategoryChange(category.value)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:text-sm ${
              activeCategory === category.value
                ? "bg-secondary text-white"
                : "bg-[#EAF3EF] text-[#6B7A75] hover:text-[#10201B] dark:bg-[#25302B] dark:text-white/65 dark:hover:text-white"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {isQueryEmpty && (
        <div className="flex min-h-45 items-center justify-center px-4 text-center">
          <p className="text-sm font-semibold text-[#6B7A75] dark:text-white/45">
            Search teams, leagues or players
          </p>
        </div>
      )}

      {isQueryTooShort && (
        <div className="flex min-h-45 items-center justify-center px-4 text-center">
          <p className="text-sm font-semibold text-[#6B7A75] dark:text-white/45">
            Type at least {minimumQueryLength} characters to search
          </p>
        </div>
      )}

      {!isQueryEmpty && !isQueryTooShort && isLoading && (
        <div className="flex min-h-45 items-center justify-center">
          <LoaderCircle className="h-6 w-6 animate-spin text-secondary" />
        </div>
      )}

      {!isQueryEmpty && !isQueryTooShort && !isLoading && error && (
        <div className="flex min-h-45 items-center justify-center px-4 text-center">
          <p className="text-sm font-semibold text-red">{error}</p>
        </div>
      )}

      {!isQueryEmpty &&
        !isQueryTooShort &&
        !isLoading &&
        !error &&
        results.length > 0 && (
          <div className="mt-6 max-h-[min(440px,calc(100vh-190px))] space-y-2 overflow-y-auto pr-1">
            {results.map((item) => (
              <Link
                key={`${item.category}-${item.id}`}
                href={item.href}
                prefetch={false}
                onClick={onResultSelect}
                className="flex w-full items-center gap-4 rounded-xl px-2 py-2 text-left transition hover:bg-[#EAF3EF] dark:hover:bg-[#25302B]"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/10 dark:bg-[#25302B]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-sm font-bold text-secondary">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold sm:text-base">
                    {item.name}
                  </h3>
                  <p className="truncate text-xs text-[#6B7A75] dark:text-white/60 sm:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      {!isQueryEmpty &&
        !isQueryTooShort &&
        !isLoading &&
        !error &&
        results.length === 0 && (
          <div className="flex min-h-45 items-center justify-center">
            <p className="text-sm font-bold text-[#6B7A75]/60 dark:text-white/25">
              No result found
            </p>
          </div>
        )}
    </Card>
  );
}
