import type { LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";

export const ALL_TEAMS_VALUE = "all-teams";

export type FixtureTeamOption = {
  label: string;
  value: string;
  logo: string | null;
};

export function getFixtureTeamOptions(
  fixtures: LeagueFixtureItem[],
): FixtureTeamOption[] {
  const teamMap = new Map<string, FixtureTeamOption>();

  fixtures.forEach((fixture) => {
    const teams = [fixture.teams.home, fixture.teams.away];

    teams.forEach((team) => {
      if (!team?.id || !team.name) return;

      const teamId = String(team.id);

      if (!teamMap.has(teamId)) {
        teamMap.set(teamId, {
          label: team.name,
          value: teamId,
          logo: team.logo ?? null,
        });
      }
    });
  });

  return [
    {
      label: "All Teams",
      value: ALL_TEAMS_VALUE,
      logo: null,
    },
    ...Array.from(teamMap.values()),
  ];
}

export function filterFixturesByTeam(
  fixtures: LeagueFixtureItem[],
  selectedTeamId: string,
) {
  if (selectedTeamId === ALL_TEAMS_VALUE) return fixtures;

  return fixtures.filter((fixture) => {
    const homeTeamId = fixture.teams.home?.id;
    const awayTeamId = fixture.teams.away?.id;

    return (
      String(homeTeamId) === selectedTeamId ||
      String(awayTeamId) === selectedTeamId
    );
  });
}
