import { CircleGauge } from "lucide-react";

import Card from "@/components/UI/cards/card";

interface FollowedItem {
  name: string;
  subtitle: string;
  value: string;
}

interface AdminFollowedCardProps {
  title: string;
  items: FollowedItem[];
}

export default function AdminFollowedCard({
  title,
  items,
}: AdminFollowedCardProps) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-bold">{title}</h3>

        <button
          type="button"
          className="text-sm font-medium text-secondary transition hover:opacity-80 dark:text-mint-green"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg bg-[#EAF3EF] p-4 dark:bg-[#25302B]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6B7A75] dark:bg-[#2a322f] dark:text-white/60">
                <CircleGauge size={17} />
              </span>

              <div>
                <h4 className="text-sm font-bold">{item.name}</h4>
                <p className="text-xs text-[#6B7A75] dark:text-white/45">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-secondary dark:text-mint-green">
                {item.value}
              </p>
              <p className="text-xs text-[#6B7A75] dark:text-white/45">
                Followers
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
