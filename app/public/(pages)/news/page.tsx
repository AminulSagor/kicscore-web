import FeaturedNewsCard from "@/app/public/(pages)/news/_components/featured-news-card";
import NewsListCard from "@/app/public/(pages)/news/_components/news-list-card";
import NewsPagination from "@/app/public/(pages)/news/_components/news-pagination";
import NewsToolbar from "@/app/public/(pages)/news/_components/news-toolbar";
import { getNewsServer } from "@/service/news/news.server.service";

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page || 1);

  const newsData = await getNewsServer({
    page: currentPage,
    limit: 11,
  });

  const [featuredNews, ...newsList] = newsData.articles;

  if (!featuredNews) return null;

  return (
    <main>
      <section className="mx-auto max-w-[1060px] pt-12 pb-24">
        <NewsToolbar />

        <FeaturedNewsCard news={featuredNews} />

        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
          {newsList.map((news) => (
            <NewsListCard key={news.id} news={news} />
          ))}
        </div>

        <NewsPagination pagination={newsData.pagination} />
      </section>
    </main>
  );
}
