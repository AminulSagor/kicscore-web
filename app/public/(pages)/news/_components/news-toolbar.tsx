import { ChevronDown } from "lucide-react";

export default function NewsToolbar() {
    return (
        <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Latest News</h1>

            <button className="flex items-center gap-1 text-xs text-[#61736D] transition hover:text-[#008A63] dark:text-white/55 dark:hover:text-[#79e2c5]">
                Sort: Recent
                <ChevronDown className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}