import Image from "next/image";

import { NewsArticle } from "@/types/news/news.types";

interface NewsCardProps {
  item: NewsArticle;
}

export default function NewsCard({ item }: NewsCardProps) {
  const imageUrl = item.imageUrl || "/images/news-fallback.png";
  const source = item.source || "KICScore";

  return (
    <article>
      <div className="relative h-[180px] overflow-hidden rounded-2xl bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <h3 className="mt-4 text-base font-bold leading-7 text-[#10201B] dark:text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">{source}</p>
    </article>
  );
}
