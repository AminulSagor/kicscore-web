import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { PlayerDetailsMock } from "@/mock/player-details/player-details.mock.types";

type PlayerProfileHeaderProps = {
    player: PlayerDetailsMock;
};

const PlayerProfileHeader = ({ player }: PlayerProfileHeaderProps) => {
    return (
        <header>
            <button className="text-[#61736D] transition hover:text-[#008A63] dark:text-white/60 dark:hover:text-[#79e2c5]">
                <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="mt-5 flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008A63] bg-[#EAF3EF] text-xs font-bold text-[#008A63] dark:bg-[#1F2926] dark:text-[#79e2c5]">
                    {player.avatar ? (
                        <Image
                            src={player.avatar}
                            alt={player.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        player.name.slice(0, 1)
                    )}
                </div>

                <div>
                    <h1 className="text-lg font-bold text-[#0B1F1A] dark:text-white">
                        {player.name}
                    </h1>
                    <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
                        {player.club}
                    </p>

                    <button className="mt-3 rounded-full bg-[#34D399] px-4 py-1.5 text-xs font-bold text-[#07110F] transition hover:bg-[#25C28A]">
                        Follow
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PlayerProfileHeader;