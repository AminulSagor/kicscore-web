import type {
    TeamFixtureItem,
    TeamPreviousMatch,
    TeamUpcomingMatch,
} from "@/types/football/fixtures/team.fixtures.types";

const formatMatchDate = (dateValue: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    })
        .format(new Date(dateValue))
        .toUpperCase();
};

const formatMatchTime = (dateValue: string) => {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(dateValue));
};

const getScore = (fixture: TeamFixtureItem) => {
    const homeGoals = fixture.goals.home ?? "-";
    const awayGoals = fixture.goals.away ?? "-";

    return `${homeGoals} - ${awayGoals}`;
};

const mapBaseMatch = (fixture: TeamFixtureItem) => ({
    id: String(fixture.fixture.id),
    date: formatMatchDate(fixture.fixture.date),
    homeTeam: fixture.teams.home.name,
    homeLogo: fixture.teams.home.logo,
    awayTeam: fixture.teams.away.name,
    awayLogo: fixture.teams.away.logo,
    competition: fixture.league.name,
});

export const mapTeamPreviousMatches = (
    fixtures: TeamFixtureItem[],
): TeamPreviousMatch[] => {
    return fixtures.map((fixture) => ({
        ...mapBaseMatch(fixture),
        score: getScore(fixture),
    }));
};

export const mapTeamUpcomingMatches = (
    fixtures: TeamFixtureItem[],
): TeamUpcomingMatch[] => {
    return fixtures.map((fixture) => ({
        ...mapBaseMatch(fixture),
        time: formatMatchTime(fixture.fixture.date),
    }));
};