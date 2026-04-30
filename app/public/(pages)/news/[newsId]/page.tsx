import { notFound } from "next/navigation";
import { newsMockData } from "@/mock/news/news.mock.data";

import NewsDetailArticle from "./_components/news-detail-article";

type NewsDetailPageProps = {
    params: Promise<{
        newsId: string;
    }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { newsId } = await params;
    const news = newsMockData.find((item) => item.id === newsId);

    if (!news) notFound();

    return (
        <main className="min-h-screen bg-[#F8FBFA] text-[#0B1F1A] dark:bg-[#07110F] dark:text-white">
            <NewsDetailArticle news={news} />
        </main>
    );
}