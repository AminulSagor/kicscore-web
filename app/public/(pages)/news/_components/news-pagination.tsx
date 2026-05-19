"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { NewsPagination as NewsPaginationType } from "@/types/news/news.types";

interface NewsPaginationProps {
  pagination: NewsPaginationType;
}

export default function NewsPagination({ pagination }: NewsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, totalPages } = pagination;

  //======= Change page =======//
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(pageNumber));
    router.push(`${pathname}?${params.toString()}`);
  };

  //======= Get visible pages =======//
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) return [1, 2, 3, 4];

    if (page >= totalPages - 2) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [page - 1, page, page + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-12 flex items-center justify-center gap-4 text-xs">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className="text-[#61736D] transition cursor-pointer hover:text-[#008A63] disabled:cursor-not-allowed disabled:opacity-35 dark:text-white/45 dark:hover:text-[#79e2c5]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base text-[#61736D] transition hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]"
          >
            1
          </button>

          <span className="text-[#61736D] dark:text-white/45">...</span>
        </>
      )}

      {visiblePages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-base transition ${
            pageNumber === page
              ? "bg-[#00C48C] text-[#07110F]"
              : "text-[#61736D] hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          <span className="text-[#61736D] dark:text-white/45">...</span>

          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base text-[#61736D] transition hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="text-[#61736D] cursor-pointer transition hover:text-[#008A63] disabled:cursor-not-allowed disabled:opacity-35 dark:text-white/45 dark:hover:text-[#79e2c5]"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
