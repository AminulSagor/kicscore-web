"use client";

import { useState } from "react";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import DatePickerDialog from "@/components/UI/dialogs/date-picker-dialog";
import { MatchTabType } from "@/types/football/matches/match.types";

type MatchSortOrder = "asc" | "desc";

interface MatchToolbarProps {
  activeTab: MatchTabType;
  selectedDate: Date;
  sortOrder: MatchSortOrder;
  onDateChange: (date: Date) => void;
  onTabChange: (tab: MatchTabType) => void;
  onSortToggle: () => void;
}

export default function MatchToolbar({
  activeTab,
  selectedDate,
  sortOrder,
  onDateChange,
  onTabChange,
  onSortToggle,
}: MatchToolbarProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  //======= Change date by day =======//
  const handleDateStep = (direction: "prev" | "next") => {
    const nextDate = new Date(selectedDate);

    nextDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
    onDateChange(nextDate);
  };

  //======= Handle by time click =======//
  const handleByTimeClick = () => {
    onTabChange("by-time");
    setIsDatePickerOpen(true);
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-8">
          <Button
            size="base"
            rounded="full"
            className="h-11 w-11 bg-mint-green p-0 text-primary hover:bg-mint-green/90"
            onClick={() => handleDateStep("prev")}
          >
            <ChevronLeft size={20} />
          </Button>

          <p className="text-base font-bold text-primary dark:text-white">
            {formattedDate}
          </p>

          <Button
            size="base"
            rounded="full"
            className="h-11 w-11 bg-mint-green p-0 text-primary hover:bg-mint-green/90"
            onClick={() => handleDateStep("next")}
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="base"
            rounded="full"
            className={`px-6 py-3 text-sm font-bold ${
              activeTab === "ongoing"
                ? "bg-mint-green text-primary hover:bg-mint-green/90"
                : "bg-[#F1F6F4] text-primary/65 hover:bg-mint-green/90 hover:text-white dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15"
            }`}
            onClick={() => onTabChange("ongoing")}
          >
            Ongoing
          </Button>

          <Button
            size="base"
            rounded="full"
            className={`px-6 py-3 text-sm font-bold ${
              activeTab === "by-time"
                ? "bg-mint-green text-primary hover:bg-mint-green/90"
                : "bg-[#F1F6F4] text-primary/65 hover:bg-mint-green/90 hover:text-white dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15"
            }`}
            onClick={handleByTimeClick}
          >
            By time
          </Button>

          <div className="h-6 w-px bg-primary/10 dark:bg-white/10" />

          <button
            type="button"
            onClick={onSortToggle}
            className="text-primary/50 transition hover:text-secondary dark:text-white/45 dark:hover:text-mint-green cursor-pointer"
            aria-label={`Sort matches ${
              sortOrder === "asc" ? "descending" : "ascending"
            }`}
          >
            <ArrowDownUp
              size={18}
              className={`transition-transform duration-300 ${
                sortOrder === "desc" ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <DatePickerDialog
        open={isDatePickerOpen}
        selectedDate={selectedDate}
        onOpenChange={setIsDatePickerOpen}
        onConfirm={onDateChange}
      />
    </>
  );
}
