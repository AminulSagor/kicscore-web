import Image from "next/image";
import { NewsItemMock } from "@/mock/news/news.mock.types";

interface NewsSmallCardProps {
  item: NewsItemMock;
}

export default function NewsSmallCard({ item }: NewsSmallCardProps) {
  return (
    <article className="flex gap-3">
      <div className="relative h-[78px] w-[96px] shrink-0 overflow-hidden rounded-xl bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-3 text-sm font-bold leading-5 text-[#10201B] dark:text-white">
          {item.title}
        </h4>

        <p className="mt-2 text-xs text-[#6B7A75] dark:text-white/45">
          SI · {item.time}
        </p>
      </div>
    </article>
  );
}
