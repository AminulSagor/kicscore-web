"use client";

import { ChangeEvent, useState } from "react";
import { ImagePlus, Save, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import {
  adminNewsSchema,
  AdminNewsFormValues,
} from "@/schema/admin/news/admin-news.schema";
import { createAdminNews } from "@/service/admin/news/admin-news.create.service";
import {
  confirmFileUpload,
  createSignedUploadUrl,
  uploadFileToSignedUrl,
} from "@/service/files/file-upload.service";

type NewsErrors = Partial<Record<keyof AdminNewsFormValues | "image", string>>;

const initialFormValues: AdminNewsFormValues = {
  title: "",
  description: "",
  snippet: "",
  keywords: "",
};

export default function CreateAdminNewsPage() {
  const router = useRouter();

  const [formValues, setFormValues] =
    useState<AdminNewsFormValues>(initialFormValues);
  const [errors, setErrors] = useState<NewsErrors>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (
    field: keyof AdminNewsFormValues,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const uploadNewsImage = async (file: File): Promise<string> => {
    const signedResponse = await createSignedUploadUrl({
      fileName: file.name,
      contentType: file.type,
      sizeBytes: file.size,
      folder: "general",
    });

    await uploadFileToSignedUrl(signedResponse.data.uploadUrl, file, file.type);

    const confirmResponse = await confirmFileUpload({
      fileId: signedResponse.data.fileId,
    });

    return confirmResponse.data.id;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = adminNewsSchema.safeParse(formValues);

    const fieldErrors: NewsErrors = {};

    if (!selectedImage) {
      fieldErrors.image = "News image is required";
    }

    if (!validatedFields.success) {
      validatedFields.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof AdminNewsFormValues;
        fieldErrors[fieldName] = issue.message;
      });
    }

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const imageId = await uploadNewsImage(selectedImage as File);

      const response = await createAdminNews({
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        keywords: formValues.keywords.trim(),
        imageId,
        ...(formValues.snippet?.trim() && {
          snippet: formValues.snippet.trim(),
        }),
      });

      toast.success(response.message || "News published successfully");
      router.push("/dashboards/admin/news");
    } catch {
      toast.error("Failed to publish news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6 text-[#10201B] dark:text-white">
      <div className="flex items-center gap-3">
        <BackArrowButton />

        <div>
          <h1 className="text-lg font-bold md:text-2xl">Create News</h1>
          <p className="mt-1 text-sm text-[#10201B]/60 dark:text-white/55">
            Publish match-related news for users.
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

            {imagePreview ? (
              <div className="relative h-56 overflow-hidden rounded-2xl border border-[#DDE8E3] dark:border-white/10">
                <Image
                  src={imagePreview}
                  alt="News preview"
                  fill
                  unoptimized
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#BFD3CB] bg-[#EAF3EF] text-center dark:border-white/15 dark:bg-[#25302B]">
                <ImagePlus className="mb-3 text-secondary dark:text-mint-green" />
                <span className="text-sm font-semibold">Upload news image</span>
                <span className="mt-1 text-xs text-[#10201B]/55 dark:text-white/45">
                  PNG, JPG or WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {errors.image && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.image}
              </p>
            )}
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
              placeholder="Real Madrid, La Liga, Football"
              className="h-12 w-full rounded-xl bg-[#EAF3EF] px-4 text-sm outline-none placeholder:text-[#10201B]/35 dark:bg-[#25302B] dark:placeholder:text-white/25"
            />
            {errors.keywords && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.keywords}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em]">
              Description
            </label>
            <textarea
              rows={7}
              value={formValues.description}
              onChange={(event) =>
                handleFieldChange("description", event.target.value)
              }
              placeholder="Write news details..."
              className="w-full resize-none rounded-xl bg-[#EAF3EF] px-4 py-3 text-sm outline-none placeholder:text-[#10201B]/35 dark:bg-[#25302B] dark:placeholder:text-white/25"
            />
            {errors.description && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.description}
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
                  Publishing
                  <ButtonLoader size="sm" />
                </>
              ) : (
                <>
                  Publish
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
