import { MatchDetailsItem } from "@/types/football/matches/match.details.types";
import { MatchHeadToHeadItem } from "@/types/football/matches/match.head-to-head.types";

import HeadToHeadMatchesCard from "./head-to-head-matches-card";
import HeadToHeadOverviewCard from "./head-to-head-overview-card";
import { ADSTERRA_NATIVE_ZONES } from "@/utils/ads/adsterra-zones";
import { AdsterraNativeBanner } from "@/components/ads/AdsterraNativeBanner";

interface HeadToHeadTabProps {
  match: MatchDetailsItem;
  matches: MatchHeadToHeadItem[];
}

//======= Head To Head Tab =======//
export default function HeadToHeadTab({ match, matches }: HeadToHeadTabProps) {
  return (
    <div className="mt-8 space-y-5">
      <HeadToHeadOverviewCard match={match} matches={matches} />

      <AdsterraNativeBanner
        {...ADSTERRA_NATIVE_ZONES.matchH2HAfterOverview}
        className="my-4"
        minHeightClassName="min-h-[130px]"
      />

      <HeadToHeadMatchesCard matches={matches} />
    </div>
  );
}
