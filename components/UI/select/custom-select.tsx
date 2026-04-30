"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type CustomSelectOption<T extends string> = {
  label: string;
  value: T;
};

type CustomSelectProps<T extends string> = {
  value: T;
  options: CustomSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  menuClassName?: string;
};

export default function CustomSelect<T extends string>({
  value,
  options,
  onChange,
  className = "",
  menuClassName = "",
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex h-9 items-center gap-2 rounded-lg bg-secondary cursor-pointer
          px-4 text-sm font-bold text-white transition hover:brightness-105
        "
      >
        {selectedOption?.label}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`
            absolute left-0 top-[calc(100%+6px)] z-30 min-w-full overflow-hidden
            rounded-xl border border-white/10 bg-secondary py-1 shadow-xl
            ${menuClassName}
          `}
        >
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-4 py-2 text-left text-sm font-semibold text-white transition ${
                  isActive ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
