import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "@/types/news/news.types";
import { getValidImage } from "@/utils/image.utils";

type NewsListCardProps = {
  news: NewsArticle;
};

export default function NewsListCard({ news }: NewsListCardProps) {
  const newsImage = getValidImage(news.imageUrl);
  const publishedDate = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString()
    : "Recently";

  return (
    <Link href={`/public/news/${news.uuid}`} className="block">
      <article className="group overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1 dark:bg-white/5">
        <div className="relative h-[170px] overflow-hidden">
          <Image
            src={newsImage}
            alt={news.title}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="line-clamp-2 text-sm leading-6 font-bold">
            {news.title}
          </h3>

          <div className="mt-6 flex items-center justify-between text-[11px] text-[#61736D] dark:text-white/50">
            <span>{news.source || "Unknown Source"}</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
