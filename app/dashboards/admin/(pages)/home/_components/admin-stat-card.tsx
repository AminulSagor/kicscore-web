import type { LucideIcon } from "lucide-react";

import Card from "@/components/UI/cards/card";

interface AdminStatCardProps {
  title: string;
  value: string;
  growth?: string;
  icon: LucideIcon;
}

export default function AdminStatCard({
  title,
  value,
  growth,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-[#6B7A75] dark:text-white/45">
            {title}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <h2 className="text-3xl font-bold">{value}</h2>

            {growth && (
              <span className="mb-1 text-xs font-bold text-mint-green">
                ↗{growth}
              </span>
            )}
          </div>
        </div>

        <Icon size={20} className="text-secondary dark:text-mint-green" />
      </div>
    </Card>
  );
}
