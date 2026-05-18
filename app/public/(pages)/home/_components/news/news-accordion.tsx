"use client";

import { useEffect, useState } from "react";

import Accordion from "@/components/UI/accordion/accordion";
import { getNews } from "@/service/news/news.service";
import { NewsArticle } from "@/types/news/news.types";

import NewsCard from "./news-card";
import NewsSmallCard from "./news-small-card";
import NewsSkeleton from "@/app/public/(pages)/home/_components/news/news-skeleton";

export default function NewsAccordion() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  //======= Fetch news =======//
  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await getNews({
          page: 1,
          limit: 3,
        });

        if (isMounted) {
          setNews(response.articles);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load news.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const [featuredNews, ...restNews] = news;

  return (
    <Accordion title="News" defaultOpen>
      <div className="space-y-5">
        {isLoading && <NewsSkeleton />}

        {!isLoading && errorMessage && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && featuredNews && (
          <>
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
          </>
        )}
      </div>
    </Accordion>
  );
}
