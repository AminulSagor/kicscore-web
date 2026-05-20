import Image from "next/image";

import { NewsArticle } from "@/types/news/news.types";
import Link from "next/link";
import { getValidImage } from "@/utils/image/image.utils";

interface NewsCardProps {
  item: NewsArticle;
}

export default function NewsCard({ item }: NewsCardProps) {
  const imageUrl = getValidImage(item.imageUrl);
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

      <Link
        href={`/public/news/${item.uuid}`}
        className="mt-4 text-base font-bold leading-7 text-[#10201B] dark:text-white"
      >
        {item.title}
      </Link>

      <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">{source}</p>
    </article>
  );
}
