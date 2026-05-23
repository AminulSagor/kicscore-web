export default function AdminNewsSkeleton() {
  return (
    <>
      <div className="hidden md:block">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid min-w-220 grid-cols-[2fr_1.2fr_1fr_0.8fr_0.7fr] gap-5 border-t border-[#DDE8E3] px-5 py-4 dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="size-14 animate-pulse rounded-xl bg-[#EAF3EF] dark:bg-[#25302B]" />
              <div className="space-y-2">
                <div className="h-3 w-48 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
                <div className="h-3 w-64 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
              </div>
            </div>

            <div className="h-4 w-full animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="h-4 w-24 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="ml-auto h-8 w-28 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#DDE8E3] bg-white p-3 dark:border-white/10 dark:bg-[#111d1a]"
          >
            <div className="h-40 animate-pulse rounded-xl bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />

            <div className="mt-4 flex items-center justify-between">
              <div className="h-3 w-24 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
              <div className="h-8 w-28 animate-pulse rounded bg-[#EAF3EF] dark:bg-[#25302B]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
