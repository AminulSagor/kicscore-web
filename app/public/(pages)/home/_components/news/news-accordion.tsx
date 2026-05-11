import { newsMockData } from "@/mock/news/news.mock.data";
import Accordion from "@/components/UI/accordion/accordion";
import NewsCard from "./news-card";
import NewsSmallCard from "./news-small-card";

export default function NewsAccordion() {
  const [featuredNews, ...restNews] = newsMockData;

  return (
    <Accordion title="News" defaultOpen>
      <div className="space-y-5">
        <NewsCard item={featuredNews} />

        <div className="divide-y divide-[#DDE8E3] dark:divide-white/10">
          {restNews.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
              <NewsSmallCard item={item} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="
            mx-auto block text-sm font-semibold
            text-[#10201B] transition hover:opacity-70
            dark:text-white
          "
        >
          See more
        </button>
      </div>
    </Accordion>
  );
}
