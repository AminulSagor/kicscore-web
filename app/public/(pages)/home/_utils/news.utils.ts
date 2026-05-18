import { IMAGE } from "@/constants/image.path";

export const getNewsImage = (imageUrl?: string | null) => {
  return imageUrl || IMAGE.fallback_image;
};

export const getNewsSource = (source?: string | null) => {
  return source || "KICScore";
};

export const getNewsTime = (publishedAt?: string | null) => {
  if (!publishedAt) return "Recently";

  const publishedDate = new Date(publishedAt);
  const now = new Date();

  const diffInMs = now.getTime() - publishedDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;

  return `${diffInDays}d ago`;
};
