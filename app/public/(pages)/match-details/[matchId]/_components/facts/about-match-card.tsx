import { formatMatchDetailDate } from "@/app/public/(pages)/match-details/_utils/match.facts.utils";
import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { MatchDetailsItem } from "@/types/football/matches/match.details.types";

interface AboutMatchCardProps {
  match: MatchDetailsItem;
}

export default function AboutMatchCard({ match }: AboutMatchCardProps) {
  const homeTeamName = match.teams.home.name;
  const awayTeamName = match.teams.away.name;
  const venueName = match.fixture.venue.name ?? "the venue";
  const matchDate = formatMatchDetailDate(
    match.fixture.date,
    match.fixture.timezone,
  );

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">About the match</h3>
      </div>

      <div className="max-w-[460px] p-5">
        <p className="text-sm font-medium leading-7 text-[#10201B] dark:text-white">
          <span className="text-mint-green">{homeTeamName}</span> faces{" "}
          <span className="text-mint-green">{awayTeamName}</span> at{" "}
          <span className="text-mint-green">{venueName}</span> on{" "}
          <span className="text-mint-green">{matchDate}</span>. This match is
          part of the{" "}
          <span className="text-mint-green">{match.league.name}</span>. You can
          check the recent head-to-head encounters, as well as full H2H record
          on this page to see how{" "}
          <span className="text-mint-green">{homeTeamName}</span> and{" "}
          <span className="text-mint-green">{awayTeamName}</span> have fared
          against each other in the past.
        </p>

        {/* <Button rounded="lg" size="base" className="mt-5 px-5">
          Expand
        </Button> */}
      </div>
    </Card>
  );
}
