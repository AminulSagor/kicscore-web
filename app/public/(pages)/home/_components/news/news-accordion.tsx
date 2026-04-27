import { newsMockData } from "@/mock/news/news.mock.data";
import NewsCard from "./news-card";
import Accordion from "@/components/UI/accordion/accordion";

export default function NewsAccordion() {
  return (
    <Accordion title="News" defaultOpen>
      <div className="grid gap-4 md:grid-cols-3">
        {newsMockData.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      <button
        type="button"
        className="
          mt-5 h-10 w-full rounded-full border
          border-[#DDE8E3] text-sm font-semibold text-[#6B7A75]
          transition hover:bg-[#EAF3EF] hover:text-[#10201B]
          dark:border-white/10 dark:text-white/65
          dark:hover:bg-white/5 dark:hover:text-white
        "
      >
        See more
      </button>
    </Accordion>
  );
}
