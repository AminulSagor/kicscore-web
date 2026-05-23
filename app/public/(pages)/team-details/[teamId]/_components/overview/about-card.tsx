"use client";

import { useState } from "react";

import Card from "@/components/UI/cards/card";

type Props = {
  about: string;
};

export default function AboutCard({ about }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      variant="white"
      padding="none"
      rounded="xl"
      shadow="none"
      className="overflow-hidden border border-[#E4E9E7] dark:border-[#27332F] dark:bg-[#121A17] dark:text-white"
    >
      <div className="border-b border-[#E4E9E7] bg-[#F2F5F4] px-4 py-3 dark:border-[#27332F] dark:bg-[#202B28]">
        <h2 className="text-sm font-semibold text-[#25302B] dark:text-[#F4F7F5]">
          About
        </h2>
      </div>

      <div className="px-4 pb-4 pt-4">
        <p
          className={`text-base text-[#37433E] dark:text-[#E4EBE8] ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {about}
        </p>

        {/* <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((previous) => !previous)}
          className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121A17]"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button> */}
      </div>
    </Card>
  );
}
