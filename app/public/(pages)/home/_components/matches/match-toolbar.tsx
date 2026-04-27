import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/UI/buttons/button";

export default function MatchToolbar() {
  return (
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
          Apr 18, 2026
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
          className="bg-[#F1F6F4] px-6 py-3 text-sm font-bold text-primary/65 hover:bg-[#E4EEE9] hover:text-primary dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15 dark:hover:text-white"
        >
          By time
        </Button>

        <div className="h-6 w-px bg-primary/10 dark:bg-white/10" />

        <ArrowDownUp size={18} className="text-primary/50 dark:text-white/45" />
      </div>
    </div>
  );
}
