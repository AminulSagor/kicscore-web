"use client";

import { useState } from "react";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import DatePickerDialog from "@/components/UI/dialogs/date-picker-dialog";

export default function MatchToolbar() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 18));

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-8">
          <Button
            size="base"
            rounded="full"
            className="h-11 w-11 bg-mint-green p-0 text-primary hover:bg-mint-green/90"
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
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="base"
            rounded="full"
            className="bg-mint-green px-6 py-3 text-sm font-bold text-primary hover:bg-mint-green/90"
          >
            Ongoing
          </Button>

          <Button
            size="base"
            rounded="full"
            className="bg-[#F1F6F4] px-6 py-3 text-sm font-bold text-primary/65 hover:bg-mint-green/90 hover:text-white dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15 dark:hover:text-white"
            onClick={() => setIsDatePickerOpen(true)}
          >
            By time
          </Button>

          <div className="h-6 w-px bg-primary/10 dark:bg-white/10" />

          <ArrowDownUp
            size={18}
            className="text-primary/50 dark:text-white/45"
          />
        </div>
      </div>

      <DatePickerDialog
        open={isDatePickerOpen}
        selectedDate={selectedDate}
        onOpenChange={setIsDatePickerOpen}
        onConfirm={setSelectedDate}
      />
    </>
  );
}
