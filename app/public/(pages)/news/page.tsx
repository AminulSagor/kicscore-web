import { newsMockData } from "@/mock/news/news.mock2data";
import FeaturedNewsCard from "./_components/featured-news-card";
import NewsListCard from "./_components/news-list-card";
import NewsPagination from "./_components/news-pagination";
import NewsToolbar from "./_components/news-toolbar";

export default function NewsPage() {
  const featuredNews = newsMockData.find((news) => news.isFeatured);
  const newsList = newsMockData.filter((news) => !news.isFeatured);

  if (!featuredNews) return null;

  return (
    <main className="">
      <section className="mx-auto max-w-[1060px] pt-12 pb-24">
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
