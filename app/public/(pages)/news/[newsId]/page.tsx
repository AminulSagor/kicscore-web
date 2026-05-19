import { notFound } from "next/navigation";

import NewsDetailArticle from "./_components/news-detail-article";

import { getSimilarNewsServer } from "@/service/news/news.server.service";

type NewsDetailPageProps = {
  params: Promise<{
    newsId: string;
  }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { newsId } = await params;

  //======= Fetch news detail with similar news =======//
  const newsData = await getSimilarNewsServer(newsId).catch(() => null);

  if (!newsData?.article) notFound();

  return (
    <main>
      <NewsDetailArticle
        news={newsData.article}
        similarNews={newsData.similar}
      />
    </main>
  );
}
