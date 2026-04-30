import { Grid2X2, MapPin, Users } from "lucide-react";
import Card from "@/components/UI/cards/card";
import { stadium } from "@/mock/team-details/team-overview.mock.data";

export default function StadiumCard() {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold">{stadium.name}</h3>
          <p className="text-xs text-[#6B7A75] dark:text-white/50">
            {stadium.location}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3EF] dark:bg-black">
          <MapPin className="h-4 w-4 text-secondary dark:text-mint-green" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <InfoItem
          icon={<Users className="h-4 w-4" />}
          label="Capacity"
          value={stadium.capacity}
        />
        <InfoItem
          icon={<Grid2X2 className="h-4 w-4" />}
          label="Surface"
          value={stadium.surface}
        />
        <InfoItem label="Opened" value={stadium.opened} />
      </div>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 text-[#6B7A75] dark:text-white/45">{icon}</div>
      <p className="text-xs text-[#6B7A75] dark:text-white/45">{label}</p>
      <p className="text-xs font-bold">{value}</p>
    </div>
  );
}
