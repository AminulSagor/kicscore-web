"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type AdminNewsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function AdminNewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AdminNewsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-[#DDE8E3] px-4 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#10201B]/60 dark:text-white/50">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex size-9 items-center justify-center rounded-lg border border-[#DDE8E3] transition hover:bg-[#EAF3EF] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition
                ${
                  currentPage === page
                    ? "bg-secondary text-white"
                    : "border border-[#DDE8E3] hover:bg-[#EAF3EF] dark:border-white/10 dark:hover:bg-white/5"
                }
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex size-9 items-center justify-center rounded-lg border border-[#DDE8E3] transition hover:bg-[#EAF3EF] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
