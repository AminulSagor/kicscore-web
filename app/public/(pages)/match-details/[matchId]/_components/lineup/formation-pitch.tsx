import Image from "next/image";

import Card from "@/components/UI/cards/card";
import {
  MatchDetailsItem,
  MatchLineupItem,
  MatchLineupPlayerWrapper,
} from "@/types/football/matches/match.details.types";
import { getValidImage } from "@/utils/image/image.utils";

interface FormationPitchProps {
  match: MatchDetailsItem;
}

type PitchSide = "home" | "away";

interface PitchPlayerView {
  id: string;
  name: string;
  image: string | null;
  number: number | null;
  position: {
    left: string;
    top: string;
  };
}

interface TeamHeaderProps {
  teamName: string;
  teamLogo: string | null;
  formation: string | null;
}

//======= Formation Pitch =======//
export default function FormationPitch({ match }: FormationPitchProps) {
  // Defensive guards: ensure match shape is present before accessing nested fields
  const safeMatch = match ?? ({} as MatchDetailsItem);

  const homeLineup = getTeamLineup(safeMatch, "home");
  const awayLineup = getTeamLineup(safeMatch, "away");

  const playerPhotoMap = buildPlayerPhotoMap(safeMatch);

  const homePlayers = homeLineup
    ? buildPitchPlayers(homeLineup, "home", playerPhotoMap)
    : [];

  const awayPlayers = awayLineup
    ? buildPitchPlayers(awayLineup, "away", playerPhotoMap)
    : [];

  const hasLineup = homePlayers.length > 0 || awayPlayers.length > 0;

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <TeamHeader
        teamName={match?.teams?.home?.name ?? ""}
        teamLogo={match?.teams?.home?.logo ?? null}
        formation={homeLineup?.formation ?? null}
      />

      <div className="relative min-h-[920px] overflow-hidden bg-[#F4F8F6] dark:bg-[#13211D] sm:min-h-[980px]">
        <PitchLines />

        {hasLineup ? (
          [...homePlayers, ...awayPlayers].map((player) => (
            <PlayerMarker key={player.id} player={player} />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
            <p className="text-sm font-medium text-[#6B7A75] dark:text-white/55">
              Lineup is not available yet.
            </p>
          </div>
        )}
      </div>

      <TeamFooter
        teamName={match?.teams?.away?.name ?? ""}
        teamLogo={match?.teams?.away?.logo ?? null}
        formation={awayLineup?.formation ?? null}
      />
    </Card>
  );
}

//======= Team Header =======//
function TeamHeader({ teamName, teamLogo, formation }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
      <div className="flex min-w-0 items-center gap-3">
        <TeamLogo teamName={teamName} teamLogo={teamLogo} />
        <h3 className="truncate text-sm font-bold">{teamName}</h3>
      </div>

      <FormationBadge formation={formation} />
    </div>
  );
}

//======= Team Footer =======//
function TeamFooter({ teamName, teamLogo, formation }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
      <div className="flex min-w-0 items-center gap-3">
        <TeamLogo teamName={teamName} teamLogo={teamLogo} />
        <h3 className="truncate text-sm font-bold">{teamName}</h3>
      </div>

      <FormationBadge formation={formation} />
    </div>
  );
}

//======= Render Team Logo =======//
function TeamLogo({
  teamName,
  teamLogo,
}: {
  teamName: string;
  teamLogo: string | null;
}) {
  return (
    <span className="relative size-7 shrink-0 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]">
      <Image
        src={getValidImage(teamLogo)}
        alt={`${teamName} logo`}
        fill
        sizes="28px"
        className="object-contain p-0.5"
      />
    </span>
  );
}

//======= Formation Badge =======//
function FormationBadge({ formation }: { formation: string | null }) {
  return (
    <span className="shrink-0 rounded-full bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
      {formation ?? "N/A"}
    </span>
  );
}

//======= Pitch Lines =======//
function PitchLines() {
  return (
    <>
      <div className="absolute left-0 top-1/2 h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
      <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDE8E3] dark:border-white/10" />
    </>
  );
}

//======= Player Marker =======//
function PlayerMarker({ player }: { player: PitchPlayerView }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{
        left: player.position.left,
        top: player.position.top,
      }}
    >
      <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] text-sm font-bold text-secondary dark:bg-[#232628] sm:size-14">
        {player.image ? (
          <Image
            src={getValidImage(player.image)}
            alt={player.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <span>{player.number ?? "-"}</span>
        )}
      </div>

      <p className="mt-2 max-w-[90px] truncate text-center text-xs font-medium text-[#10201B] dark:text-white">
        {player.name}
      </p>
    </div>
  );
}

//======= Prepare Lineup =======//
function getTeamLineup(match: MatchDetailsItem, side: PitchSide) {
  // Guard against missing teams or lineups
  if (!match || !match.teams || !match.teams[side]) return null;

  const teamId = match.teams[side].id;

  if (!Array.isArray(match.lineups) || match.lineups.length === 0) return null;

  return match.lineups.find((lineup) => lineup?.team?.id === teamId) ?? null;
}

function buildPitchPlayers(
  lineup: MatchLineupItem,
  side: PitchSide,
  playerPhotoMap: Map<number, string>,
): PitchPlayerView[] {
  const startXI = Array.isArray(lineup.startXI) ? lineup.startXI : [];

  if (startXI.length === 0) return [];

  const gridMeta = buildGridMeta(startXI);
  const fallbackRows = buildFallbackRows(startXI.length, lineup.formation);

  return startXI.map((item, index) => {
    const parsedGrid = parsePlayerGrid(item?.player?.grid ?? null);
    const position =
      parsedGrid && gridMeta.rows.has(parsedGrid.row)
        ? getGridPosition(index, parsedGrid.row, gridMeta, side)
        : getFallbackPosition(index, fallbackRows, side);

    const playerId = item?.player?.id;

    return {
      id: `${lineup.team.id}-${playerId ?? index}`,
      name: item?.player?.name ?? "Unknown",
      image: playerId ? (playerPhotoMap.get(playerId) ?? null) : null,
      number: item?.player?.number ?? null,
      position,
    };
  });
}

//======= Grid Position =======//
function buildGridMeta(players: MatchLineupPlayerWrapper[]) {
  const rows = new Map<number, number[]>();

  if (!Array.isArray(players) || players.length === 0) {
    return {
      rows,
      maxRow: 1,
    };
  }

  players.forEach((item, index) => {
    const parsedGrid = parsePlayerGrid(item?.player?.grid ?? null);

    if (!parsedGrid) return;

    const rowItems = rows.get(parsedGrid.row) ?? [];
    rows.set(parsedGrid.row, [...rowItems, index]);
  });

  const maxRow = Math.max(...Array.from(rows.keys()), 1);

  return {
    rows,
    maxRow,
  };
}

function parsePlayerGrid(grid: string | null) {
  if (!grid) return null;

  const [rowValue, columnValue] = grid.split(":");
  const row = Number(rowValue);
  const column = Number(columnValue);

  if (!Number.isFinite(row) || !Number.isFinite(column)) {
    return null;
  }

  return {
    row,
    column,
  };
}

function getGridPosition(
  playerIndex: number,
  row: number,
  gridMeta: ReturnType<typeof buildGridMeta>,
  side: PitchSide,
) {
  const rowItems = gridMeta.rows.get(row) ?? [];
  const positionInRow = Math.max(rowItems.indexOf(playerIndex), 0);

  return {
    left: getDistributedLeft(positionInRow, rowItems.length),
    top: getRowTop(row - 1, gridMeta.maxRow, side),
  };
}

//======= Fallback Position =======//
function buildFallbackRows(totalPlayers: number, formation: string | null) {
  const groups = getFormationGroups(formation, totalPlayers);
  const rows: number[][] = [];
  let playerIndex = 0;

  groups.forEach((groupTotal) => {
    const rowItems: number[] = [];

    for (let index = 0; index < groupTotal; index += 1) {
      if (playerIndex < totalPlayers) {
        rowItems.push(playerIndex);
        playerIndex += 1;
      }
    }

    if (rowItems.length) {
      rows.push(rowItems);
    }
  });

  return rows;
}

function getFormationGroups(formation: string | null, totalPlayers: number) {
  const fallbackGroups = [1, 4, 3, 3];

  if (!formation) {
    return fallbackGroups;
  }

  const formationGroups = formation
    .split("-")
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  const groups = [1, ...formationGroups];
  const groupTotal = groups.reduce((total, value) => total + value, 0);

  return groupTotal === totalPlayers ? groups : fallbackGroups;
}

function getFallbackPosition(
  playerIndex: number,
  rows: number[][],
  side: PitchSide,
) {
  const rowIndex = rows.findIndex((row) => row.includes(playerIndex));
  const currentRow = rows[rowIndex] ?? [playerIndex];
  const positionInRow = Math.max(currentRow.indexOf(playerIndex), 0);

  return {
    left: getDistributedLeft(positionInRow, currentRow.length),
    top: getRowTop(rowIndex, rows.length, side),
  };
}

//======= Position Helpers =======//
function getDistributedLeft(index: number, total: number) {
  const spacing = 100 / (total + 1);

  return `${spacing * (index + 1)}%`;
}

function getRowTop(rowIndex: number, rowTotal: number, side: PitchSide) {
  const progress = rowTotal <= 1 ? 0 : rowIndex / (rowTotal - 1);

  if (side === "home") {
    // Home players occupy top 5%–44% of the pitch (well above the 50% centre line)
    return `${5 + progress * 39}%`;
  }

  // Away players occupy 95%–56% of the pitch (well below the 50% centre line)
  return `${95 - progress * 39}%`;
}

//======= Prepare Player Photo =======//
function buildPlayerPhotoMap(match: MatchDetailsItem) {
  const photoMap = new Map<number, string>();

  if (!match || !Array.isArray(match.players) || match.players.length === 0) {
    return photoMap;
  }

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
