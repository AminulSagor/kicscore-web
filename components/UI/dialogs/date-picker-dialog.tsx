"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Dialog from "@/components/UI/dialogs/dialog";

type DatePickerDialogProps = {
  open: boolean;
  selectedDate: Date;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
  markedDates?: string[];
  lockedYear?: number;
};

type DatePickerDialogContentProps = Omit<
  DatePickerDialogProps,
  "open" | "onOpenChange"
> & {
  onClose: () => void;
};

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createLockedDate(date: Date, lockedYear?: number) {
  if (!lockedYear) return date;

  return new Date(
    lockedYear,
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
}

function getMonthStart(date: Date, lockedYear?: number) {
  const lockedDate = createLockedDate(date, lockedYear);

  return new Date(lockedDate.getFullYear(), lockedDate.getMonth(), 1);
}

function isSameDate(a: Date, b: Date) {
  return toDateKey(a) === toDateKey(b);
}

function isDateAllowed(date: Date, lockedYear?: number) {
  return !lockedYear || date.getFullYear() === lockedYear;
}

function getMonthDays(activeMonth: Date) {
  const year = activeMonth.getFullYear();
  const month = activeMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekDay = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  for (let i = startWeekDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  while (days.length < 42) {
    const nextDay = days.length - startWeekDay - totalDays + 1;

    days.push({
      date: new Date(year, month + 1, nextDay),
      isCurrentMonth: false,
    });
  }

  return days;
}

function DatePickerDialogContent({
  selectedDate,
  onConfirm,
  onClose,
  markedDates = [],
  lockedYear,
}: DatePickerDialogContentProps) {
  const lockedSelectedDate = createLockedDate(selectedDate, lockedYear);

  const [activeMonth, setActiveMonth] = useState(() =>
    getMonthStart(lockedSelectedDate, lockedYear),
  );

  const [draftDate, setDraftDate] = useState(lockedSelectedDate);

  const monthDays = useMemo(() => getMonthDays(activeMonth), [activeMonth]);

  const activeYear = activeMonth.getFullYear();
  const activeMonthIndex = activeMonth.getMonth();

  const canGoPrevMonth =
    !lockedYear || activeYear > lockedYear || activeMonthIndex > 0;

  const canGoNextMonth =
    !lockedYear || activeYear < lockedYear || activeMonthIndex < 11;

  const monthTitle = activeMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;

    setActiveMonth(new Date(activeYear, activeMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    if (!canGoNextMonth) return;

    setActiveMonth(new Date(activeYear, activeMonthIndex + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateAllowed(date, lockedYear)) return;

    setDraftDate(createLockedDate(date, lockedYear));
  };

  const handleConfirm = () => {
    onConfirm(createLockedDate(draftDate, lockedYear));
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoPrevMonth}
          onClick={handlePrevMonth}
          className="grid size-8 place-items-center rounded-full text-[#6B7A75] transition hover:bg-[#EAF3EF] hover:text-[#10201B] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:disabled:hover:bg-transparent"
        >
          <ChevronLeft size={18} />
        </button>

        <h3 className="text-xl font-bold text-secondary dark:text-white">
          {monthTitle}
        </h3>

        <button
          type="button"
          disabled={!canGoNextMonth}
          onClick={handleNextMonth}
          className="grid size-8 place-items-center rounded-full text-[#6B7A75] transition hover:bg-[#EAF3EF] hover:text-[#10201B] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white dark:disabled:hover:bg-transparent"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-xs font-bold text-[#6B7A75] dark:text-white/50"
          >
            {day}
          </div>
        ))}

        {monthDays.map(({ date, isCurrentMonth }) => {
          const selected = isSameDate(date, draftDate);
          const marked = markedDates.includes(toDateKey(date));
          const allowed = isDateAllowed(date, lockedYear);

          return (
            <button
              key={toDateKey(date)}
              type="button"
              disabled={!allowed}
              onClick={() => handleDateSelect(date)}
              className={`relative mx-auto grid size-9 place-items-center rounded-full text-sm font-medium transition ${
                selected
                  ? "bg-secondary text-white"
                  : "text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/10"
              } ${!isCurrentMonth || !allowed ? "opacity-25" : ""} ${
                !allowed
                  ? "cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent"
                  : ""
              }`}
            >
              {date.getDate()}

              {marked && !selected && (
                <span className="absolute bottom-1 size-1 rounded-full bg-secondary" />
              )}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        rounded="full"
        className="h-12 w-full text-xs font-bold uppercase tracking-[0.16em]"
        onClick={handleConfirm}
      >
        Confirm Date
      </Button>
    </div>
  );
}

export default function DatePickerDialog({
  open,
  selectedDate,
  onOpenChange,
  onConfirm,
  markedDates = [],
  lockedYear,
}: DatePickerDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      position="center"
      hideClose
      className="rounded-3xl border border-[#DDE8E3] bg-white text-[#10201B] shadow-2xl dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      {open && (
        <DatePickerDialogContent
          selectedDate={selectedDate}
          onConfirm={onConfirm}
          onClose={() => onOpenChange(false)}
          markedDates={markedDates}
          lockedYear={lockedYear}
        />
      )}
    </Dialog>
  );
}
