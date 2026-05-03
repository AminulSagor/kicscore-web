import Image from "next/image";
import Link from "next/link";
import type { NewsItemMock } from "@/mock/news/news.mock.types";

type NewsListCardProps = {
  news: NewsItemMock;
};

export default function NewsListCard({ news }: NewsListCardProps) {
  return (
    <Link href={`/public/news/${news.id}`} className="block">
      <article className="group overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1 dark:bg-white/5">
        <div className="relative h-[170px] overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="line-clamp-2 text-sm font-bold leading-6">
            {news.title}
          </h3>

          <div className="mt-6 flex items-center justify-between text-[11px] text-[#61736D] dark:text-white/50">
            <span>{news.source}</span>
            <span>{news.time}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
