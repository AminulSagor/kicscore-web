import LineupPlayerGroupCard from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/lineup-player-group-card";
import KnockoutBracket from "./knockout-bracket";
import {
  matchBench,
  matchCoaches,
  matchSubstitutes,
} from "@/mock/match-details/match-lineup.mock.data";

export default function KnockoutTab() {
  return (
    <div className="mt-8 space-y-5">
      <KnockoutBracket />
      <LineupPlayerGroupCard
        title="Coach"
        players={matchCoaches}
        columns="two"
      />

      <LineupPlayerGroupCard title="Substitutes" players={matchSubstitutes} />

      <LineupPlayerGroupCard title="Bench" players={matchBench} />
    </div>
  );
}
