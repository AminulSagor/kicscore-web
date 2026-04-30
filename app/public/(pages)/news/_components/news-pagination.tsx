import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewsPagination() {
    return (
        <div className="mt-12 flex items-center justify-center gap-4 text-xs">
            <button className="text-[#61736D] transition hover:text-[#008A63] dark:text-white/45 dark:hover:text-[#79e2c5]">
                <ChevronLeft className="h-4 w-4" />
            </button>

            {[1, 2, 3].map((page) => (
                <button
                    key={page}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition ${page === 1
                            ? "bg-[#00C48C] text-[#07110F]"
                            : "text-[#61736D] hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]"
                        }`}
                >
                    {page}
                </button>
            ))}

            <span className="text-[#61736D] dark:text-white/45">...</span>

            <button className="text-[#61736D] transition hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]">
                8
            </button>

            <button className="text-[#61736D] transition hover:text-[#008A63] dark:text-white/45 dark:hover:text-[#79e2c5]">
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}