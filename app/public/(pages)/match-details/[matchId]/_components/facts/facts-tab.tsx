import AboutMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/about-match-card";
import NextMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/next-match-card";
import TeamFormCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/team-form-card";
import FormationPitch from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/formation-pitch";
import type { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";
import type { MatchDetailsItem } from "@/types/football/matches/match.details.types";

import MatchInfoCard from "../match-info-card";
import MatchEvents from "./match-events";
import PlayerOfTheMatch from "./player-of-the-match";
import TopStats from "./top-stats";
import { AdsterraNativeBanner } from "@/components/ads/AdsterraNativeBanner";
import {
  ADSTERRA_BANNER_ZONES,
  ADSTERRA_NATIVE_ZONES,
} from "@/utils/ads/adsterra-zones";
import { AdsterraBannerAd } from "@/components/ads/AdsterraBannerAd";

interface FactsTabProps {
  match: MatchDetailsItem;
  nextMatches: TeamFixtureItem[];
}

export default function FactsTab({ match, nextMatches }: FactsTabProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        {/* <PlayerOfTheMatch /> */}
        <TopStats match={match} />
        <AdsterraNativeBanner
          {...ADSTERRA_NATIVE_ZONES.matchFactsAfterTopStats}
          className="my-4"
          minHeightClassName="min-h-[130px]"
        />
        <MatchEvents match={match} />
        <FormationPitch match={match} />

        {/* <TeamFormCard /> */}
        <AdsterraBannerAd
          {...ADSTERRA_BANNER_ZONES.banner728x90}
          className="mt-8 mb-10 hidden md:flex"
        />
        <NextMatchCard fixtures={nextMatches} />
        <AboutMatchCard match={match} />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20 space-y-4">
        <MatchInfoCard match={match} />
        <AdsterraBannerAd
          {...ADSTERRA_BANNER_ZONES.banner320x50}
          className="mt-4 hidden xl:flex"
        />
      </aside>
    </div>
  );
}
