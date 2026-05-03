import Image from "next/image";
import Link from "next/link";
import { Copy, Share2 } from "lucide-react";
import type { NewsItemMock } from "@/mock/news/news.mock.types";

type NewsDetailArticleProps = {
  news: NewsItemMock;
};

export default function NewsDetailArticle({ news }: NewsDetailArticleProps) {
  return (
    <article className=" mx-auto max-w-[1060px] pt-20 pb-36">
      <div className="text-[11px] font-medium text-[#7E8E88] dark:text-white/50">
        <Link
          href="/public/news"
          className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
        >
          News
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#00C48C]">Arsenal vs Man City</span>
      </div>

      <h1 className="mt-6 max-w-[660px] text-[34px] font-bold leading-[1.18] tracking-[-0.03em] text-[#0B1F1A] md:text-[48px] dark:text-white">
        {news.title}
      </h1>

      <div className="mt-8 flex items-center justify-between border-b border-[#D8E7DF] pb-7 dark:border-white/8">
        <div className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#EAF3EF] text-[11px] font-bold uppercase text-[#008A63] dark:bg-white/6 dark:text-[#79e2c5]">
            {news.category.slice(0, 3)}
          </span>

          <div>
            <p className="text-sm font-semibold text-[#0B1F1A] dark:text-white">
              {news.source} Editorial
            </p>
            <p className="mt-1 text-xs text-[#61736D] dark:text-white/50">
              Published {news.publishedDate} • 4 min read
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[#61736D] dark:text-white/55">
          <button
            aria-label="Share news"
            className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            aria-label="Copy news link"
            className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-8 h-[330px] overflow-hidden rounded-md md:h-[380px]">
        <Image
          src={news.detailImage}
          alt={news.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-7">
        {news.detailSections.map((section) => (
          <section key={section.id}>
            {section.title && (
              <h2 className="mb-4 text-[22px] font-bold tracking-[-0.02em] text-[#0B1F1A] dark:text-white">
                {section.title}
              </h2>
            )}

            <div className="space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.id}
                  className="text-[15px] leading-8 text-[#40524C] dark:text-white/70"
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
