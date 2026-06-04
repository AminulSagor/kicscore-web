"use client";

import Link from "next/link";
import Card from "@/components/UI/cards/card";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl flex items-center justify-center h-full">
        {/* Decorative SVG background */}
        <svg
          viewBox="0 0 800 400"
          className="pointer-events-none absolute -left-16 -top-24 h-[420px] w-[110%] opacity-30 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="g2" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <g>
            <circle cx="120" cy="80" r="80" fill="url(#g1)">
              <animate attributeName="cx" values="120;260;120" dur="10s" repeatCount="indefinite" />
              <animate attributeName="cy" values="80;40;80" dur="8s" repeatCount="indefinite" />
            </circle>

            <ellipse cx="620" cy="280" rx="140" ry="80" fill="url(#g2)">
              <animate attributeName="cx" values="620;520;620" dur="12s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.85;0.5;0.85" dur="7s" repeatCount="indefinite" />
            </ellipse>

            <g fill="#fff" fillOpacity="0.06">
              <rect x="360" y="40" width="220" height="120" rx="24">
                <animate attributeName="x" values="360;400;360" dur="9s" repeatCount="indefinite" />
              </rect>
            </g>
          </g>
        </svg>

        <Card
          variant="white"
          rounded="2xl"
          padding="lg"
          shadow="md"
          className="relative z-10 overflow-hidden border border-black/10 !bg-[#F3F7F5] !text-[#10201B] dark:!border-white/10 dark:!bg-dark-green dark:!text-white"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-white shadow-lg">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 7h2v6h-2zM11 15h2v2h-2z" fill="currentColor" />
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 20a8 8 0 110-16 8 8 0 010 16z" fill="currentColor" />
              </svg>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-foreground">404</h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Oops — we can’t find the page you’re looking for. It may have been moved or removed.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/public/home"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-white font-medium shadow hover:opacity-95"
              >
                Back to Home
              </Link>

              <Link
                href="/public/news"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium dark:border-white/10 dark:text-white bg-transparent"
              >
                Browse News
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">If you typed the URL manually, double-check for typos.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
