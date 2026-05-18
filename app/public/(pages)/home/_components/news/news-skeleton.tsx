export default function NewsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="h-[180px] animate-pulse rounded-2xl bg-[#EAF3EF] dark:bg-white/5" />
        <div className="h-5 w-11/12 animate-pulse rounded bg-[#EAF3EF] dark:bg-white/5" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[#EAF3EF] dark:bg-white/5" />
      </div>

      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div key={item} className="flex gap-3">
            <div className="h-[78px] w-[96px] shrink-0 animate-pulse rounded-xl bg-[#EAF3EF] dark:bg-white/5" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#EAF3EF] dark:bg-white/5" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[#EAF3EF] dark:bg-white/5" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-[#EAF3EF] dark:bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
