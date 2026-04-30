import { newsMockData } from "@/mock/news/news.mock.data";

import FeaturedNewsCard from "./_components/featured-news-card";
import NewsListCard from "./_components/news-list-card";
import NewsPagination from "./_components/news-pagination";
import NewsToolbar from "./_components/news-toolbar";

export default function NewsPage() {
    const featuredNews = newsMockData.find((news) => news.isFeatured);
    const newsList = newsMockData.filter((news) => !news.isFeatured);

    if (!featuredNews) return null;

    return (
        <main className="min-h-screen bg-[#F8FBFA] text-[#0B1F1A] dark:bg-[#07110F] dark:text-white">
            <section className="padding-x mx-auto max-w-[760px] pt-12 pb-24">
                <NewsToolbar />

                <FeaturedNewsCard news={featuredNews} />

                <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
                    {newsList.map((news) => (
                        <NewsListCard key={news.id} news={news} />
                    ))}
                </div>

                <NewsPagination />
            </section>
        </main>
    );
}