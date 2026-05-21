"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import type { FixtureTeamOption } from "@/app/public/(pages)/league-details/_utils/fixture-team.utils";

type FixtureTeamSelectorProps = {
  value: string;
  options: FixtureTeamOption[];
  onChange: (value: string) => void;
  className?: string;
};

function TeamLogo({ option }: { option: FixtureTeamOption }) {
  if (!option.logo) {
    return (
      <span className="size-5 shrink-0 rounded-full border border-[#8A98A3] dark:border-white/35" />
    );
  }

  return (
    <span className="relative size-5 shrink-0 overflow-hidden rounded-full">
      <Image
        src={option.logo}
        alt={option.label}
        fill
        sizes="20px"
        className="object-contain"
      />
    </span>
  );
}

export default function FixtureTeamSelector({
  value,
  options,
  onChange,
  className = "",
}: FixtureTeamSelectorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (teamId: string) => {
    onChange(teamId);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-lg bg-[#EAF3EF] px-3 text-sm font-bold text-[#10201B] transition hover:bg-[#DDE8E3] dark:bg-[#25302B] dark:text-white dark:hover:bg-[#2f3b36]"
      >
        <span className="flex min-w-0 items-center gap-2">
          {selectedOption && <TeamLogo option={selectedOption} />}
          <span className="truncate">
            {selectedOption?.label ?? "All Teams"}
          </span>
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-[#DDE8E3] bg-white p-1 shadow-xl dark:border-white/10 dark:bg-[#111d1a]">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                  selected
                    ? "bg-[#EAF3EF] text-secondary dark:bg-white/10 dark:text-white"
                    : "text-[#10201B] hover:bg-[#F4F8F6] dark:text-white/80 dark:hover:bg-white/5"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <TeamLogo option={option} />
                  <span className="truncate">{option.label}</span>
                </span>

                {selected && (
                  <Check size={15} className="shrink-0 text-secondary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
