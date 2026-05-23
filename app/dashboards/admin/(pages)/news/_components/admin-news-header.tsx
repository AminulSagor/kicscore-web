"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/UI/buttons/button";

export default function AdminNewsHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-lg font-bold md:text-2xl">News Management</h1>
        <p className="mt-1 text-sm text-[#10201B]/60 dark:text-white/55">
          Manage match news and football-related posts.
        </p>
      </div>

      <Button
        size="base"
        onClick={() => router.push("/dashboards/admin/news/create")}
        className="w-full sm:w-fit"
      >
        <Plus size={16} />
        Create News
      </Button>
    </div>
  );
}
