import Card from "@/components/UI/cards/card";

export default function LiveMatchCardSkeleton() {
  return (
    <Card
      variant="white"
      rounded="2xl"
      padding="md"
      shadow="sm"
      className="min-w-[280px] border border-black/10 bg-white dark:border-white/10 dark:bg-dark-green md:min-w-[360px] xl:min-w-[390px]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-[#EAF3EF] dark:bg-white/10" />
        <div className="h-4 w-16 rounded bg-[#EAF3EF] dark:bg-white/10" />
      </div>

      <div className="space-y-3">
        <div className="h-8 rounded bg-[#EAF3EF] dark:bg-white/10" />
        <div className="h-8 rounded bg-[#EAF3EF] dark:bg-white/10" />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
        <div className="h-4 w-24 rounded bg-[#EAF3EF] dark:bg-white/10" />
        <div className="h-4 w-12 rounded bg-[#EAF3EF] dark:bg-white/10" />
      </div>
    </Card>
  );
}
