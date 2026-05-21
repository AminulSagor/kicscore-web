import { MatchDetailsItem } from "@/types/football/matches/match.details.types";
import { MatchHeadToHeadItem } from "@/types/football/matches/match.head-to-head.types";

import HeadToHeadMatchesCard from "./head-to-head-matches-card";
import HeadToHeadOverviewCard from "./head-to-head-overview-card";

interface HeadToHeadTabProps {
  match: MatchDetailsItem;
  matches: MatchHeadToHeadItem[];
}

//======= Head To Head Tab =======//
export default function HeadToHeadTab({ match, matches }: HeadToHeadTabProps) {
  return (
    <div className="mt-8 space-y-5">
      <HeadToHeadOverviewCard match={match} matches={matches} />
      <HeadToHeadMatchesCard matches={matches} />
    </div>
  );
}
