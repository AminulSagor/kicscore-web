import Link from "next/link";

export default function NavbarGetAppButton() {
  return (
    <Link
      href={process.env.NEXT_PUBLIC_PLAYSTORE_URL || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-get-app-shake hidden h-9 items-center gap-2 rounded-full bg-[#10231D] px-4 text-white transition hover:bg-[#12362C] lg:inline-flex"
    >
      <span className="flex h-5 w-5 items-center justify-center">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path fill="#00C48C" d="M3.5 2.4v19.2l10.2-9.6L3.5 2.4Z" />
          <path
            fill="#FFD15C"
            d="m13.7 12 2.8-2.6 3.5 2a1 1 0 0 1 0 1.7l-3.5 2-2.8-3.1Z"
          />
          <path fill="#4EA8FF" d="M3.5 2.4 16.5 9.4 13.7 12 3.5 2.4Z" />
          <path fill="#FF5C5C" d="M3.5 21.6 13.7 12l2.8 3.1-13 6.5Z" />
        </svg>
      </span>

      <span className="text-[11px] font-bold tracking-[0.16em] whitespace-nowrap">
        GET THE APP
      </span>
    </Link>
  );
}
