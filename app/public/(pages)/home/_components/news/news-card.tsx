import Image from "next/image";
import { NewsItemMock } from "@/mock/news/news.mock.types";

interface NewsCardProps {
  item: NewsItemMock;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article>
      <div className="relative h-[180px] overflow-hidden rounded-2xl bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-4 text-base font-bold leading-7 text-[#10201B] dark:text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">
        SI · {item.time}
      </p>
    </article>
  );
}
