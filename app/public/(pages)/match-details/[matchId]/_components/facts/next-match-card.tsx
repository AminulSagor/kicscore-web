import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";

export default function NextMatchCard() {
  return (
    <div>
      <h3 className="mb-5 text-base font-bold text-[#10201B] dark:text-white">
        Next match
      </h3>

      <div className="grid gap-4 lg:grid-cols-2">
        <MatchCard />
        <MatchCard />
      </div>
    </div>
  );
}

function MatchCard() {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <p className="text-center text-xs font-bold text-[#6B7A75] dark:text-white/55">
        Champions League Final Stage <span className="ml-1">●</span>
      </p>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Team name="Barcelona" image={IMAGE.fc_porto} />

        <div className="text-center">
          <h4 className="text-2xl font-bold">01:00</h4>
          <p className="mt-1 text-sm font-semibold text-[#6B7A75] dark:text-white/55">
            Tomorrow
          </p>
        </div>

        <Team name="Atletico Madrid" image={IMAGE.portugal} />
      </div>
    </Card>
  );
}

function Team({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-14 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <p className="mt-3 text-center text-xs font-bold">{name}</p>
    </div>
  );
}
