import Image from "next/image";

import { NewsArticle } from "@/types/news/news.types";

interface NewsSmallCardProps {
  item: NewsArticle;
}

export default function NewsSmallCard({ item }: NewsSmallCardProps) {
  const imageUrl = item.imageUrl || "/images/news-fallback.png";
  const source = item.source || "KICScore";

  return (
    <article className="flex gap-3">
      <div className="relative h-[78px] w-[96px] shrink-0 overflow-hidden rounded-xl bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-3 text-sm font-bold leading-5 text-[#10201B] dark:text-white">
          {item.title}
        </h4>

        <p className="mt-2 text-xs text-[#6B7A75] dark:text-white/45">
          {source}
        </p>
      </div>
    </article>
  );
}
