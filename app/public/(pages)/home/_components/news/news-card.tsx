import Image from "next/image";
import { NewsItemMock } from "@/mock/news/news.mock.types";
import NewsSmallCard from "./news-small-card";

interface NewsCardProps {
  item: NewsItemMock;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article>
      <div className="relative h-[174px] overflow-hidden rounded-lg bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-4 text-base font-bold leading-5 text-[#10201B] dark:text-white">
        {item.title}
      </h3>

      <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
        {item.time}
      </p>

      <div className="mt-5">
        <NewsSmallCard item={item} />
      </div>
    </article>
  );
}
