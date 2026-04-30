import Image from "next/image";
import Link from "next/link";
import type { NewsItemMock } from "@/mock/news/news.mock.types";

type FeaturedNewsCardProps = {
    news: NewsItemMock;
};

export default function FeaturedNewsCard({ news }: FeaturedNewsCardProps) {
    return (
        <Link href={`/public/news/${news.id}`} className="block">
            <article className="group overflow-hidden rounded-md">
                <div className="relative h-[320px] overflow-hidden rounded-md md:h-[340px]">
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        priority
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                    <div className="absolute right-6 bottom-7 left-6">
                        <h2 className="max-w-[620px] text-2xl font-bold leading-tight text-white md:text-[30px]">
                            {news.title}
                        </h2>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 text-xs text-[#61736D] md:flex-row md:items-start md:justify-between dark:text-white/55">
                    <p className="max-w-[560px] leading-6">{news.description}</p>

                    <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.time}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}