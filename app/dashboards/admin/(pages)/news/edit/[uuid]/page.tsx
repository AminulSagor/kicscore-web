"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import { IMAGE } from "@/constants/image.path";
import {
  adminNewsEditSchema,
  AdminNewsEditFormValues,
} from "@/schema/admin/news/admin-news-edit.schema";
import { AdminNewsItem } from "@/types/admin/news/admin-news-get";
import { updateAdminNews } from "@/types/admin/news/news-update";

type NewsErrors = Partial<Record<keyof AdminNewsEditFormValues, string>>;

const getStoredNews = (): AdminNewsItem | null => {
  if (typeof window === "undefined") return null;

  const storedNews = sessionStorage.getItem("selectedAdminNews");

  if (!storedNews) return null;

  return JSON.parse(storedNews) as AdminNewsItem;
};

export default function EditAdminNewsPage() {
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const storedNews = getStoredNews();

  const [formValues, setFormValues] = useState<AdminNewsEditFormValues>(() => ({
    title: storedNews?.title || "",
    snippet: storedNews?.snippet || "",
    keywords: storedNews?.keywords || "",
  }));

  const [errors, setErrors] = useState<NewsErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageUrl = storedNews?.imageUrl || "";

  const handleFieldChange = (
    field: keyof AdminNewsEditFormValues,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = adminNewsEditSchema.safeParse(formValues);

    if (!validatedFields.success) {
      const fieldErrors: NewsErrors = {};

      validatedFields.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof AdminNewsEditFormValues;
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await updateAdminNews(params.uuid, {
        title: formValues.title.trim(),
        keywords: formValues.keywords.trim(),
        ...(formValues.snippet?.trim() && {
          snippet: formValues.snippet.trim(),
        }),
      });

      toast.success(response.message || "News updated successfully");
      router.push("/dashboards/admin/news");
    } catch {
      toast.error("Failed to update news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6 text-[#10201B] dark:text-white">
      <div className="flex items-center gap-3">
        <BackArrowButton />

        <div>
          <h1 className="text-lg font-bold md:text-2xl">Edit News</h1>
          <p className="mt-1 text-sm text-[#10201B]/60 dark:text-white/55">
            Update custom news information.
          </p>
        </div>
      </div>

      <Card
        variant="white"
        rounded="2xl"
        padding="lg"
        className="border border-[#DDE8E3] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em]">
              News Image
            </label>

            <img
              src={imageUrl || IMAGE.fallback_image}
              alt="News"
              className="h-56 w-full rounded-2xl border border-[#DDE8E3] object-cover dark:border-white/10"
            />

            <p className="mt-2 text-xs text-[#10201B]/50 dark:text-white/45">
              Image cannot be changed from edit page.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em]">
              Title
            </label>
            <input
              value={formValues.title}
              onChange={(event) =>
                handleFieldChange("title", event.target.value)
              }
              placeholder="Enter news title"
              className="h-12 w-full rounded-xl bg-[#EAF3EF] px-4 text-sm outline-none placeholder:text-[#10201B]/35 dark:bg-[#25302B] dark:placeholder:text-white/25"
            />
            {errors.title && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em]">
              Snippet{" "}
              <span className="text-[#10201B]/45 dark:text-white/40">
                (Optional)
              </span>
            </label>
            <input
              value={formValues.snippet}
              onChange={(event) =>
                handleFieldChange("snippet", event.target.value)
              }
              placeholder="Short news summary"
              className="h-12 w-full rounded-xl bg-[#EAF3EF] px-4 text-sm outline-none placeholder:text-[#10201B]/35 dark:bg-[#25302B] dark:placeholder:text-white/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em]">
              Keywords
            </label>
            <input
              value={formValues.keywords}
              onChange={(event) =>
                handleFieldChange("keywords", event.target.value)
              }
              placeholder="Real Madrid, Stadium"
              className="h-12 w-full rounded-xl bg-[#EAF3EF] px-4 text-sm outline-none placeholder:text-[#10201B]/35 dark:bg-[#25302B] dark:placeholder:text-white/25"
            />
            {errors.keywords && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.keywords}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="base"
              disabled={isSubmitting}
              className="min-w-36"
            >
              {isSubmitting ? (
                <>
                  Updating
                  <ButtonLoader size="sm" />
                </>
              ) : (
                <>
                  Update News
                  <Save size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
