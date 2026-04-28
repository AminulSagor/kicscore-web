"use client";

import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { searchMockData } from "@/mock/search/search.mock.data";
import { SearchCategory } from "@/mock/search/search.mock.types";

const categories: { label: string; value: SearchCategory }[] = [
  { label: "All", value: "all" },
  { label: "Teams", value: "teams" },
  { label: "Leagues", value: "leagues" },
  { label: "Players", value: "players" },
  { label: "Matches", value: "matches" },
];

interface SearchPopoverProps {
  query: string;
  activeCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  popoverWidth?: "desktop" | "mobile";
}

export default function SearchPopover({
  query,
  activeCategory,
  onCategoryChange,
  popoverWidth = "desktop",
}: SearchPopoverProps) {
  const filteredItems = searchMockData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

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
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onCategoryChange(category.value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === category.value
                ? "bg-secondary text-white"
                : "bg-[#EAF3EF] text-[#6B7A75] dark:bg-[#25302B] dark:text-white/65"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="mt-10 space-y-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex w-full items-center gap-5 text-left"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h3 className="text-base font-semibold">{item.name}</h3>
                <p className="text-sm text-[#6B7A75] dark:text-white/60">
                  {item.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex min-h-45 items-center justify-center">
          <p className="text-xl font-bold text-[#6B7A75]/60 dark:text-white/25">
            No result found
          </p>
        </div>
      )}
    </Card>
  );
}
