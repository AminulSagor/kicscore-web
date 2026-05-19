"use client";

import { Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface NewsDetailShareActionsProps {
  title: string;
}

export default function NewsDetailShareActions({
  title,
}: NewsDetailShareActionsProps) {
  //======= Share news link =======//
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      toast.success("News link copied");
    } catch {
      toast.error("Unable to share news");
    }
  };

  //======= Copy news link =======//
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("News link copied");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  return (
    <div className="flex items-center gap-5 text-[#61736D] dark:text-white/55">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share news"
        className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
      >
        <Share2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy news link"
        className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
