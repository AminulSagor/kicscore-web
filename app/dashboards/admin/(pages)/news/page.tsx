"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Card from "@/components/UI/cards/card";
import { deleteAdminNews } from "@/service/admin/news/news-delete";
import { getAdminNews } from "@/service/admin/news/news-get";
import { AdminNewsItem } from "@/types/admin/news/admin-news-get";

import AdminNewsDeleteDialog from "./_components/admin-news-delete-dialog";
import AdminNewsHeader from "./_components/admin-news-header";
import AdminNewsPagination from "./_components/admin-news-pagination";
import AdminNewsTable from "./_components/admin-news-table";

const NEWS_LIMIT = 20;

export default function AdminNewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPosts, setNewsPosts] = useState<AdminNewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<AdminNewsItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNews = async (page: number) => {
    try {
      const response = await getAdminNews(page, NEWS_LIMIT);
      const totalPageCount = response.data.pagination.totalPages;

      setNewsPosts(response.data.articles || []);
      setTotalPages(totalPageCount > 0 ? totalPageCount : 1);
      setCurrentPage(page);
    } catch {
      toast.error("Failed to load news");
    } finally {
      setIsInitialLoading(false);
    }
  };

  useState(() => {
    fetchNews(1);
  });

  const handlePageChange = (page: number) => {
    fetchNews(page);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedNews) return;

    try {
      setIsDeleting(true);

      const response = await deleteAdminNews(selectedNews.uuid);

      setNewsPosts((prev) =>
        prev.filter((news) => news.uuid !== selectedNews.uuid),
      );

      toast.success(response.message || "News deleted successfully");
      setSelectedNews(null);
    } catch {
      toast.error("Failed to delete news");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-6 text-[#10201B] dark:text-white">
      <AdminNewsHeader />

      <Card
        variant="white"
        rounded="2xl"
        padding="none"
        className="overflow-hidden border border-[#DDE8E3] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        <AdminNewsTable
          newsPosts={newsPosts}
          isLoading={isInitialLoading}
          onDeleteClick={setSelectedNews}
        />

        <AdminNewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>

      <AdminNewsDeleteDialog
        open={Boolean(selectedNews)}
        isDeleting={isDeleting}
        newsTitle={selectedNews?.title}
        onClose={() => setSelectedNews(null)}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}
