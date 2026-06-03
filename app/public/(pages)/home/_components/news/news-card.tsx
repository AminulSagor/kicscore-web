import Image from "next/image";
import Link from "next/link";

import { NewsArticle } from "@/types/news/news.types";
import { getValidImage } from "@/utils/image/image.utils";

interface NewsCardProps {
  item: NewsArticle;
}

export default function NewsCard({ item }: NewsCardProps) {
  const imageUrl = getValidImage(item.imageUrl);
  const source = item.source || "Kicscore";
  const href = `/public/news/${item.uuid}`;

  return (
    <article>
      <Link
        href={href}
        className="relative block h-[180px] overflow-hidden rounded-2xl bg-[#EAF3EF] dark:bg-white/5"
      >
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
        />
      </Link>

      <Link
        href={href}
        className="mt-4 block text-base font-bold leading-7 text-[#10201B] dark:text-white"
      >
        {item.title}
      </Link>

      <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">{source}</p>
    </article>
  );
}
