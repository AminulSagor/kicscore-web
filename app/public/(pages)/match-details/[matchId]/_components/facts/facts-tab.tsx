import FormationPitch from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/formation-pitch";
import MatchInfoCard from "../match-info-card";
import MatchEvents from "./match-events";
import PlayerOfTheMatch from "./player-of-the-match";
import TopStats from "./top-stats";
import TeamFormCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/team-form-card";
import NextMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/next-match-card";
import AboutMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/about-match-card";

export default function FactsTab() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <PlayerOfTheMatch />
        <TopStats />
        <MatchEvents />
        <FormationPitch />

        <TeamFormCard />
        <NextMatchCard />
        <AboutMatchCard />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20">
        <MatchInfoCard />
      </aside>
    </div>
  );
}
