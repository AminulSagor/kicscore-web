"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
};

export default function BackArrowButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className={`
        inline-flex size-9 items-center justify-center rounded-full
        text-[#10201B] transition hover:bg-[#EAF3EF]
        dark:text-white dark:hover:bg-white/5 cursor-pointer
        ${className}
      `}
    >
      <ArrowLeft className="size-5" />
    </button>
  );
}
