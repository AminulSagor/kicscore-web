import type {
    PlayerFixtureTeam,
    PlayerMatch,
    PlayerMatchEvent,
    PlayerMatchGroup,
    PlayerRecentMatchItem,
} from "@/types/football/players/player.types";

const formatMatchDate = (dateValue: string) => {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
    })
        .format(date)
        .toUpperCase();
};

const getPlayerTeam = (
    item: PlayerRecentMatchItem,
    preferredTeamId: string,
    availableTeamIds: string[],
): PlayerFixtureTeam | null => {
    const { home, away } = item.fixture.teams;

    if (String(home.id) === preferredTeamId) {
        return home;
    }

    if (String(away.id) === preferredTeamId) {
        return away;
    }

    if (availableTeamIds.includes(String(home.id))) {
        return home;
    }

    if (availableTeamIds.includes(String(away.id))) {
        return away;
    }

    return null;
};

const getOpponentTeam = (
    item: PlayerRecentMatchItem,
    playerTeam: PlayerFixtureTeam,
) => {
    const { home, away } = item.fixture.teams;

    return home.id === playerTeam.id ? away : home;
};

const getScore = (item: PlayerRecentMatchItem) => {
    const homeScore = item.fixture.goals.home ?? "-";
    const awayScore = item.fixture.goals.away ?? "-";

    return `${homeScore} - ${awayScore}`;
};

const getPrimaryEvent = (events: PlayerMatchEvent[]) => {
    return (
        events.find(
            (event) => event.type === "Goal" && event.role === "PLAYER",
        ) ??
        events.find((event) => event.role === "ASSIST") ??
        events[0] ??
        null
    );
};

const getGoalLabel = (item: PlayerRecentMatchItem) => {
    if (item.player.goals > 0) {
        return `${item.player.goals} Goal${item.player.goals > 1 ? "s" : ""}`;
    }

    if (item.player.assists > 0) {
        return `${item.player.assists} Assist${item.player.assists > 1 ? "s" : ""}`;
    }

    return "0 Goal";
};

const mapMatch = (
    item: PlayerRecentMatchItem,
    playerTeam: PlayerFixtureTeam,
): PlayerMatch => {
    const opponentTeam = getOpponentTeam(item, playerTeam);
    const primaryEvent = getPrimaryEvent(item.player.events);

    return {
        id: item.fixtureId,
        date: formatMatchDate(item.fixture.fixture.date),
        league: item.fixture.league.name,
        opponent: opponentTeam.name,
        score: getScore(item),
        goal: getGoalLabel(item),
        minute: primaryEvent?.minute ?? "-",
    };
};

export const mapPlayerMatchGroups = (
    items: PlayerRecentMatchItem[],
    preferredTeamId: string,
    availableTeamIds: string[],
): PlayerMatchGroup[] => {
    const groups = new Map<string, PlayerMatchGroup>();

    items.forEach((item) => {
        const playerTeam = getPlayerTeam(
            item,
            preferredTeamId,
            availableTeamIds,
        );

        if (!playerTeam) {
            return;
        }

        const teamId = String(playerTeam.id);
        const existingGroup = groups.get(teamId);

        const match = mapMatch(item, playerTeam);

        if (existingGroup) {
            existingGroup.matches.push(match);
            return;
        }

        groups.set(teamId, {
            id: teamId,
            team: playerTeam.name,
            country: item.fixture.league.country ?? "",
            matches: [match],
        });
    });

    return Array.from(groups.values());
};