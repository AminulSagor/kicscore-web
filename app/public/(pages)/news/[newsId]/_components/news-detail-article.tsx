import Image from "next/image";
import Link from "next/link";
import { Copy, Share2 } from "lucide-react";

import type { NewsArticle } from "@/types/news/news.types";
import { getValidImage } from "@/utils/image.utils";
import NewsDetailShareActions from "@/app/public/(pages)/news/[newsId]/_components/news-detail-share-actions";

type NewsDetailArticleProps = {
  news: NewsArticle;
  similarNews?: NewsArticle[];
};

export default function NewsDetailArticle({
  news,
  similarNews = [],
}: NewsDetailArticleProps) {
  const newsImage = getValidImage(news.imageUrl);
  const category = news.categories?.[0] || "sports";
  const source = news.source || "KICScore";
  const publishedDate = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString()
    : "Recently";
  const articleText =
    news.description || news.snippet || "No article details available.";

  return (
    <article className="mx-auto max-w-[1060px] pt-12 pb-15">
      <div className="text-[15px] font-medium text-[#7E8E88] dark:text-white/50">
        <Link
          href="/public/news"
          className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
        >
          News
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#00C48C]">{category}</span>
      </div>

      <h1 className="mt-6 max-w-[660px] text-[34px] leading-[1.18] font-bold tracking-[-0.03em] text-[#0B1F1A] md:text-[48px] dark:text-white">
        {news.title}
      </h1>

      <div className="mt-8 flex items-center justify-between border-b border-[#D8E7DF] pb-7 dark:border-white/8">
        <div className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#EAF3EF] text-[11px] font-bold text-[#008A63] uppercase dark:bg-white/6 dark:text-[#79e2c5]">
            {category.slice(0, 3)}
          </span>

          <div>
            <p className="text-sm font-semibold text-[#0B1F1A] dark:text-white">
              {source} Editorial
            </p>
            <p className="mt-1 text-xs text-[#61736D] dark:text-white/50">
              Published {publishedDate}
            </p>
          </div>
        </div>

        <NewsDetailShareActions title={news.title} />
      </div>

      <div className="relative mt-8 h-[330px] overflow-hidden rounded-md md:h-[380px]">
        <Image
          src={newsImage}
          alt={news.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-7">
        <p className="text-[15px] leading-8 text-[#40524C] dark:text-white/70">
          {articleText}
        </p>

        {news.url && (
          <Link
            href={news.url}
            target="_blank"
            className="inline-flex text-sm font-semibold text-[#008A63] transition hover:opacity-80 dark:text-[#79e2c5]"
          >
            Read full article
          </Link>
        )}
      </div>

      {similarNews.length > 0 && (
        <section className="mt-16 border-t border-[#D8E7DF] pt-10 dark:border-white/8">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0B1F1A] dark:text-white">
            Similar News
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
            {similarNews.map((item) => {
              const similarImage = getValidImage(item.imageUrl);
              const similarDate = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString()
                : "Recently";

              return (
                <Link
                  key={item.id}
                  href={`/public/news/${item.uuid}`}
                  className="group overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1 dark:bg-white/5"
                >
                  <div className="relative h-[170px] overflow-hidden bg-[#EAF3EF] dark:bg-white/5">
                    <Image
                      src={similarImage}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-sm leading-6 font-bold text-[#0B1F1A] dark:text-white">
                      {item.title}
                    </h3>

                    <div className="mt-6 flex items-center justify-between text-[11px] text-[#61736D] dark:text-white/50">
                      <span>{item.source || "KICScore"}</span>
                      <span>{similarDate}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
