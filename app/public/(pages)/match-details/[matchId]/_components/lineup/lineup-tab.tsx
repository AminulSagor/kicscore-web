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

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <FormationPitch match={match} />

        <LineupPlayerGroupCard title="Coach" players={coaches} columns="two" />

        <LineupPlayerGroupCard title="Bench" players={substitutes} />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20">
        <MatchInfoCard match={match} />
      </aside>
    </div>
  );
}

// helper to avoid calling map/flatMap on undefined
function safeArray<T>(v?: T[] | null): T[] {
  return Array.isArray(v) ? v : [];
}

//======= Build player photo map from match.players =======//
function buildPlayerPhotoMap(match: MatchDetailsItem): Map<number, string> {
  const photoMap = new Map<number, string>();

  if (!Array.isArray(match.players)) return photoMap;

  match.players.forEach((team) => {
    if (!team || !Array.isArray(team.players)) return;

    team.players.forEach((item) => {
      const pid = item?.player?.id;
      const pphoto = item?.player?.photo;

      if (pid && pphoto) {
        photoMap.set(pid, pphoto);
      }
    });
  });

  return photoMap;
}

//======= Prepare Coaches =======//
function buildCoaches(match: MatchDetailsItem): LineupPerson[] {
  return safeArray(match.lineups)
    .filter((lineup) => lineup?.coach?.name)
    .map((lineup) => ({
      id: `coach-${lineup.team.id}-${lineup.coach.id ?? lineup.coach.name}`,
      name: lineup.coach.name ?? "Unknown Coach",
      image: lineup.coach.photo ?? null,
      meta: lineup.team.name,
    }));
}

//======= Prepare Substitutes (with player photos) =======//
function buildSubstitutes(match: MatchDetailsItem): LineupPerson[] {
  const playerPhotoMap = buildPlayerPhotoMap(match);

  return safeArray(match.lineups).flatMap((lineup) =>
    safeArray(lineup.substitutes).map((item, index) => {
      const playerId = item.player.id;
      return {
        id: `substitute-${lineup.team.id}-${playerId ?? index}`,
        name: item.player.name ?? "Unknown Player",
        number: item.player.number,
        image: playerId ? (playerPhotoMap.get(playerId) ?? null) : null,
        meta: lineup.team.name,
      };
    }),
  );
}
