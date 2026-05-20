"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Dialog from "@/components/UI/dialogs/dialog";
import CustomSelect, {
  CustomSelectOption,
} from "@/components/UI/select/custom-select";

type DatePickerDialogProps = {
  open: boolean;
  selectedDate: Date;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
  markedDates?: string[];
  enableMonthPicker?: boolean;
  lockedYear?: number;
};

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const monthOptions: CustomSelectOption<string>[] = [
  { label: "Jan", value: "0" },
  { label: "Feb", value: "1" },
  { label: "Mar", value: "2" },
  { label: "Apr", value: "3" },
  { label: "May", value: "4" },
  { label: "Jun", value: "5" },
  { label: "Jul", value: "6" },
  { label: "Aug", value: "7" },
  { label: "Sep", value: "8" },
  { label: "Oct", value: "9" },
  { label: "Nov", value: "10" },
  { label: "Dec", value: "11" },
];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
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

function isSameDate(a: Date, b: Date) {
  return toDateKey(a) === toDateKey(b);
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

export default function DatePickerDialog({
  open,
  selectedDate,
  onOpenChange,
  onConfirm,
  markedDates = [],
  enableMonthPicker = false,
  lockedYear,
}: DatePickerDialogProps) {
  const lockedSelectedDate = createLockedDate(selectedDate, lockedYear);

  const [activeMonth, setActiveMonth] = useState(
    new Date(
      lockedSelectedDate.getFullYear(),
      lockedSelectedDate.getMonth(),
      1,
    ),
  );
  const [draftDate, setDraftDate] = useState(lockedSelectedDate);

  const monthDays = useMemo(() => getMonthDays(activeMonth), [activeMonth]);

  const activeYear = activeMonth.getFullYear();
  const activeMonthIndex = activeMonth.getMonth();

  const monthTitle = activeMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setActiveMonth(new Date(activeYear, activeMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setActiveMonth(new Date(activeYear, activeMonthIndex + 1, 1));
  };

  const handleMonthChange = (month: string) => {
    const nextMonth = Number(month);

    setActiveMonth(new Date(activeYear, nextMonth, 1));
    setDraftDate((prevDate) =>
      createLockedDate(
        new Date(activeYear, nextMonth, prevDate.getDate()),
        lockedYear,
      ),
    );
  };

  const handleDateSelect = (date: Date) => {
    setDraftDate(createLockedDate(date, lockedYear));
  };

  const handleConfirm = () => {
    onConfirm(createLockedDate(draftDate, lockedYear));
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      position="center"
      hideClose
      className="rounded-3xl border border-[#DDE8E3] bg-white text-[#10201B] shadow-2xl dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="grid size-8 place-items-center rounded-full text-[#6B7A75] transition hover:bg-[#EAF3EF] hover:text-[#10201B] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <h3 className="text-xl font-bold text-secondary dark:text-white">
            {monthTitle}
          </h3>

          <button
            type="button"
            onClick={handleNextMonth}
            className="grid size-8 place-items-center rounded-full text-[#6B7A75] transition hover:bg-[#EAF3EF] hover:text-[#10201B] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {enableMonthPicker && (
          <div className="flex justify-center">
            <CustomSelect
              value={String(activeMonthIndex)}
              options={monthOptions}
              onChange={handleMonthChange}
            />
          </div>
        )}

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

            return (
              <button
                key={toDateKey(date)}
                type="button"
                onClick={() => handleDateSelect(date)}
                className={`relative mx-auto grid size-9 place-items-center rounded-full text-sm font-medium transition ${
                  selected
                    ? "bg-secondary text-white"
                    : "text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/10"
                } ${!isCurrentMonth ? "opacity-25" : ""}`}
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
    </Dialog>
  );
}
