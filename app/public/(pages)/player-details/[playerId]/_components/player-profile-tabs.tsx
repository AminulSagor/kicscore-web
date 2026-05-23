import Link from "next/link";

import type { PlayerDetailsTabKey } from "@/types/football/players/player.types";

const tabs: { label: string; value: PlayerDetailsTabKey }[] = [
    { label: "Profile", value: "profile" },
    { label: "Matches", value: "matches" },
    { label: "Stats", value: "stats" },
    { label: "Career", value: "career" },
];

type PlayerProfileTabsProps = {
    playerId: string;
    activeTab: PlayerDetailsTabKey;
    season: string;
    fromSeason: string;
    toSeason: string;
};

const PlayerProfileTabs = ({
    playerId,
    activeTab,
    season,
    fromSeason,
    toSeason,
}: PlayerProfileTabsProps) => {
    const getTabHref = (tab: PlayerDetailsTabKey) => {
        const params = new URLSearchParams({
            tab,
            season,
            fromSeason,
            toSeason,
        });

        return `/public/player-details/${playerId}?${params.toString()}`;
    };

    return (
        <div className="mt-8 flex items-center gap-7 border-b border-[#D8E7DF] dark:border-white/8">
            {tabs.map((tab) => (
                <Link
                    key={tab.value}
                    href={getTabHref(tab.value)}
                    className={`pb-3 text-xs font-semibold transition ${activeTab === tab.value
                            ? "border-b-2 border-[#34D399] text-[#0B1F1A] dark:text-white"
                            : "text-[#61736D] hover:text-[#008A63] dark:text-white/50 dark:hover:text-[#79e2c5]"
                        }`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
};

export default PlayerProfileTabs;