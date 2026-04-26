import Image from "next/image";
import { NewsItemMock } from "@/mock/news/news.mock.types";

interface NewsSmallCardProps {
  item: NewsItemMock;
}

export default function NewsSmallCard({ item }: NewsSmallCardProps) {
  return (
    <div className="flex gap-3">
      <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-md bg-[#EAF3EF] dark:bg-white/5">
        <Image
          src={item.relatedImage}
          alt={item.relatedTitle}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold leading-5 text-[#10201B] dark:text-white">
          {item.relatedTitle}
        </h4>
        <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
          {item.relatedTime}
        </p>
      </div>
    </div>
  );
}
