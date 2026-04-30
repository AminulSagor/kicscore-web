import type { PlayerTraitMock } from "@/mock/player-details/player-details.mock.types";

type PlayerTraitsCardProps = {
  traits: PlayerTraitMock[];
};

const traitPositions = [
  "top-[50px] left-8 text-left",
  "top-[50px] right-8 text-right",
  "top-[138px] right-5 text-right",
  "bottom-[34px] right-10 text-right",
  "bottom-[34px] left-10 text-left",
  "top-[138px] left-5 text-left",
];

const PlayerTraitsCard = ({ traits }: PlayerTraitsCardProps) => {
  const polygonPoints = "150,52 250,105 205,180 150,218 115,170 118,95";

  return (
    <section className="relative min-h-[360px] overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
      <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-white/6">
        <h2 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
          Player traits
        </h2>
      </div>

      <div className="relative h-[300px]">
        <svg
          viewBox="0 0 300 300"
          className="absolute left-1/2 top-[52%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2"
        >
          <polygon
            points="150,25 265,90 265,210 150,275 35,210 35,90"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />
          <polygon
            points="150,65 230,110 230,190 150,235 70,190 70,110"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />
          <polygon
            points="150,105 195,130 195,170 150,195 105,170 105,130"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />

          <line
            x1="150"
            y1="25"
            x2="150"
            y2="275"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />
          <line
            x1="35"
            y1="90"
            x2="265"
            y2="210"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />
          <line
            x1="265"
            y1="90"
            x2="35"
            y2="210"
            stroke="rgba(11,31,26,0.18)"
            className="dark:stroke-[rgba(255,255,255,0.12)]"
          />

          <polygon
            points={polygonPoints}
            fill="rgba(0,196,140,0.28)"
            stroke="#008A63"
            strokeWidth="5"
          />
        </svg>

        {traits.map((trait, index) => (
          <div
            key={trait.label}
            className={`absolute max-w-[95px] text-[10px] font-bold uppercase leading-4 text-[#61736D] dark:text-white/55 ${traitPositions[index] ?? ""
              }`}
          >
            <p>{trait.label}</p>
            <p className="text-[#008A63]">{trait.value}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayerTraitsCard;