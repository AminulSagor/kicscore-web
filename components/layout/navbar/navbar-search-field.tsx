"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { SearchCategory } from "@/types/search/football-search.types";

import SearchPopover from "./search-popover";
import { useNavbarSearch } from "@/hooks/search/use-navbar-search";

interface NavbarSearchFieldProps {
  className?: string;
  inputClassName?: string;
  popoverWidth?: "desktop" | "mobile";
  onResultSelect?: () => void;
}

export default function NavbarSearchField({
  className = "",
  inputClassName = "",
  popoverWidth = "desktop",
  onResultSelect,
}: NavbarSearchFieldProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { results, error, isLoading, minimumQueryLength } = useNavbarSearch({
    query,
    activeCategory,
    enabled: isOpen,
  });

  //======= Close Popover On Outside Click =======//
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //======= Handle Result Select =======//
  const handleResultSelect = () => {
    setIsOpen(false);
    onResultSelect?.();
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`flex h-11 items-center rounded-md bg-[#EAF3EF] px-4 dark:bg-white/8 ${inputClassName}`}
      >
        <Search className="mr-3 h-4 w-4 text-[#6B7A75] dark:text-white" />

        <input
          type="text"
          value={query}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search teams, leagues and players"
          aria-expanded={isOpen}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
              event.currentTarget.blur();
            }
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          placeholder="Search"
          className="w-full bg-transparent text-sm text-[#10201B] placeholder:text-[#6B7A75] focus:outline-none dark:text-white dark:placeholder:text-white/45"
        />
      </div>

      {isOpen && (
        <SearchPopover
          query={query}
          activeCategory={activeCategory}
          results={results}
          error={error}
          isLoading={isLoading}
          minimumQueryLength={minimumQueryLength}
          onCategoryChange={setActiveCategory}
          onResultSelect={handleResultSelect}
          popoverWidth={popoverWidth}
        />
      )}
    </div>
  );
}
