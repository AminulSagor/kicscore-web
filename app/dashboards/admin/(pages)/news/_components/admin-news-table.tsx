"use client";

import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

import { IMAGE } from "@/constants/image.path";
import { AdminNewsItem } from "@/types/admin/news/admin-news-get";

import AdminNewsSkeleton from "./admin-news-skeleton";

type AdminNewsTableProps = {
  newsPosts: AdminNewsItem[];
  isLoading: boolean;
  onDeleteClick: (news: AdminNewsItem) => void;
};

export default function AdminNewsTable({
  newsPosts,
  isLoading,
  onDeleteClick,
}: AdminNewsTableProps) {
  const router = useRouter();

  const handleEdit = (post: AdminNewsItem) => {
    sessionStorage.setItem("selectedAdminNews", JSON.stringify(post));
    router.push(`/dashboards/admin/news/edit/${post.uuid}`);
  };

  if (isLoading) {
    return <AdminNewsSkeleton />;
  }

  if (!newsPosts.length) {
    return (
      <div className="p-8 text-center text-sm text-[#10201B]/60 dark:text-white/50">
        No news found.
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-220 text-left">
          <thead className="bg-[#EAF3EF] text-xs uppercase tracking-[0.12em] text-[#10201B]/70 dark:bg-[#25302B] dark:text-white/60">
            <tr>
              <th className="px-5 py-4">News</th>
              <th className="px-5 py-4">Snippet</th>
              <th className="px-5 py-4">Keywords</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {newsPosts.map((post) => (
              <tr
                key={post.id}
                className="border-t border-[#DDE8E3] dark:border-white/10"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.imageUrl || IMAGE.fallback_image}
                      alt={post.title}
                      className="size-14 shrink-0 rounded-xl bg-[#EAF3EF] object-cover dark:bg-[#25302B]"
                    />

                    <div>
                      <h3 className="line-clamp-1 text-sm font-semibold">
                        {post.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-xs text-[#10201B]/55 dark:text-white/45">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-[#10201B]/65 dark:text-white/60">
                  <span className="line-clamp-2 max-w-60">
                    {post.snippet || "No snippet"}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-[#10201B]/65 dark:text-white/60">
                  <span className="line-clamp-2 max-w-52">
                    {post.keywords || "No keywords"}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-[#10201B]/65 dark:text-white/60">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      className="rounded-lg p-2 text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/5"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteClick(post)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {newsPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-[#DDE8E3] bg-white p-3 dark:border-white/10 dark:bg-[#111d1a]"
          >
            <img
              src={post.imageUrl || IMAGE.fallback_image}
              alt={post.title}
              className="h-40 w-full rounded-xl bg-[#EAF3EF] object-cover dark:bg-[#25302B]"
            />

            <h3 className="mt-3 line-clamp-2 text-sm font-bold">
              {post.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs text-[#10201B]/60 dark:text-white/50">
              {post.snippet || "No snippet"}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-[#10201B]/55 dark:text-white/45">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(post)}
                  className="rounded-lg p-2 text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/5"
                >
                  <Edit size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteClick(post)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
