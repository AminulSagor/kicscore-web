import MatchInfoCard from "@/app/public/(pages)/match-details/[matchId]/_components/match-info-card";
import { MatchDetailsItem } from "@/types/football/matches/match.details.types";

import FormationPitch from "./formation-pitch";
import LineupPlayerGroupCard, {
  LineupPerson,
} from "./lineup-player-group-card";

interface LineupTabProps {
  match: MatchDetailsItem;
}

export default function LineupTab({ match }: LineupTabProps) {
  const coaches = buildCoaches(match);
  const substitutes = buildSubstitutes(match);
  const startingPlayers = buildStartingPlayers(match);

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <FormationPitch match={match} />

        <LineupPlayerGroupCard title="Coach" players={coaches} columns="two" />

        <LineupPlayerGroupCard title="Substitutes" players={substitutes} />

        <LineupPlayerGroupCard title="Starting XI" players={startingPlayers} />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20">
        <MatchInfoCard match={match} />
      </aside>
    </div>
  );
}

//======= Prepare Coaches =======//
function buildCoaches(match: MatchDetailsItem): LineupPerson[] {
  return match.lineups
    .filter((lineup) => lineup.coach.name)
    .map((lineup) => ({
      id: `coach-${lineup.team.id}-${lineup.coach.id ?? lineup.coach.name}`,
      name: lineup.coach.name ?? "Unknown Coach",
      image: lineup.coach.photo ?? null,
      meta: lineup.team.name,
    }));
}

//======= Prepare Substitutes =======//
function buildSubstitutes(match: MatchDetailsItem): LineupPerson[] {
  return match.lineups.flatMap((lineup) =>
    lineup.substitutes.map((item, index) => ({
      id: `substitute-${lineup.team.id}-${item.player.id ?? index}`,
      name: item.player.name ?? "Unknown Player",
      number: item.player.number,
      meta: lineup.team.name,
    })),
  );
}

//======= Prepare Starting Players =======//
function buildStartingPlayers(match: MatchDetailsItem): LineupPerson[] {
  return match.lineups.flatMap((lineup) =>
    lineup.startXI.map((item, index) => ({
      id: `starting-${lineup.team.id}-${item.player.id ?? index}`,
      name: item.player.name ?? "Unknown Player",
      number: item.player.number,
      meta: lineup.team.name,
    })),
  );
}
