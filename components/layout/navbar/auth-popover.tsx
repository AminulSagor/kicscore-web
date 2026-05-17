"use client";

import Button from "@/components/UI/buttons/button";

interface AuthPopoverProps {
  onSignIn: () => void;
}

export default function AuthPopover({ onSignIn }: AuthPopoverProps) {
  return (
    <div className="absolute right-0 top-12 md:top-14 z-50 w-71 rounded-2xl border border-[#DDE8E3] bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#111f1d]">
      <h3 className="mb-2 text-base font-semibold text-[#10201B] dark:text-white">
        Experience More
      </h3>

      <p className="mb-5 text-sm leading-5 text-[#6B7A75] dark:text-white/60">
        Sign in to sync your favorites across devices and get personalized match
        updates.
      </p>

      <Button onClick={onSignIn} className="w-full">
        Sign In
      </Button>

      <button
        type="button"
        className="mt-4 w-full text-center text-xs text-[#078B63] dark:text-[#72e3c6]"
      >
        New to Kicscore? Join Kicscore
      </button>
    </div>
  );
}
