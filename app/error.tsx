"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // simple telemetry hook point (left as comment for integrators)
    // sendErrorToService?.(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFDFB] dark:bg-[#07120F] p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#E6F5EB] dark:bg-white/5">
          <svg
            className="h-12 w-12 text-[#0F6D3A] dark:text-white animate-spin-slow"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.93 4.93l2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.24 16.24l2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.93 19.07l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#10201B] dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#556A62] dark:text-white/60">
          We ran into a problem while loading this page. You can try again or return to the homepage.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-md bg-[#0F6D3A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0e5c33]"
          >
            Retry
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#10201B] hover:bg-[#F3F7F5] dark:border-white/10 dark:bg-transparent dark:text-white"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-6 text-left text-xs text-[#5C7169] dark:text-white/50">
          <button
            onClick={() => setShowDetails((s) => !s)}
            className="underline"
            aria-expanded={showDetails}
          >
            {showDetails ? "Hide details" : "Show technical details"}
          </button>

          {showDetails && (
            <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-[#F3F7F5] p-3 text-[11px] text-[#0F2F28] dark:bg-[#071613] dark:text-white/70">
              {error?.message}
              {error?.stack ? "\n" + error.stack : ""}
            </pre>
          )}
        </div>

        <p className="mt-6 text-xs text-[#80958F] dark:text-white/40">If this keeps happening, please contact support with the error details above.</p>
      </div>
    </div>
  );
}

// tiny animation utility class (Tailwind won't include this unless used in markup)
// add to global CSS if preferred; keeping here so runtime works without extra config
