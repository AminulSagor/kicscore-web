import type { FootballPlayerEntry } from "@/types/football/players/player.types";
import type {
    TeamCoachApiItem,
    TeamSquadGroup,
    TeamSquadMember,
} from "@/types/football/teams/team.squad.types";

const API_SPORTS_FLAG_BASE_URL = "https://media.api-sports.io/flags";

const GROUP_ORDER = [
    "Goalkeepers",
    "Defenders",
    "Midfielders",
    "Attackers",
    "Others",
];

const NATIONALITY_FLAG_CODES: Record<string, string> = {
    albania: "al",
    algeria: "dz",
    argentina: "ar",
    australia: "au",
    austria: "at",
    belgium: "be",
    brazil: "br",
    cameroon: "cm",
    canada: "ca",
    chile: "cl",
    colombia: "co",
    croatia: "hr",
    denmark: "dk",
    ecuador: "ec",
    england: "gb-eng",
    estonia: "ee",
    finland: "fi",
    france: "fr",
    germany: "de",
    ghana: "gh",
    greece: "gr",
    hungary: "hu",
    iceland: "is",
    ireland: "ie",
    italy: "it",
    japan: "jp",
    mali: "ml",
    mexico: "mx",
    morocco: "ma",
    netherlands: "nl",
    nigeria: "ng",
    norway: "no",
    paraguay: "py",
    peru: "pe",
    poland: "pl",
    portugal: "pt",
    romania: "ro",
    scotland: "gb-sct",
    senegal: "sn",
    serbia: "rs",
    slovakia: "sk",
    slovenia: "si",
    spain: "es",
    sweden: "se",
    switzerland: "ch",
    tunisia: "tn",
    turkey: "tr",
    ukraine: "ua",
    uruguay: "uy",
    usa: "us",
    "united states": "us",
    venezuela: "ve",
    wales: "gb-wls",
};

const getCountryFlagUrl = (nationality: string | null) => {
    if (!nationality) {
        return null;
    }

    const flagCode = NATIONALITY_FLAG_CODES[nationality.trim().toLowerCase()];

    if (!flagCode) {
        return null;
    }

    return `${API_SPORTS_FLAG_BASE_URL}/${flagCode}.svg`;
};

const getCareerStartTime = (start: string | null) => {
    if (!start) {
        return 0;
    }

    const time = new Date(start).getTime();

    return Number.isNaN(time) ? 0 : time;
};

const getCoachTeamCareer = (coach: TeamCoachApiItem, teamId: string) => {
    return coach.career
        .filter((career) => String(career.team.id) === teamId)
        .sort(
            (first, second) =>
                getCareerStartTime(second.start) -
                getCareerStartTime(first.start),
        )[0];
};

export const mapCurrentTeamCoach = (
    coaches: TeamCoachApiItem[],
    teamId: string,
): TeamSquadMember | null => {
    const candidates = coaches
        .map((coach) => ({
            coach,
            career: getCoachTeamCareer(coach, teamId),
        }))
        .filter(
            (
                item,
            ): item is {
                coach: TeamCoachApiItem;
                career: NonNullable<ReturnType<typeof getCoachTeamCareer>>;
            } => Boolean(item.career),
        );

    const activeCandidates = candidates.filter(
        (candidate) => candidate.career.end === null,
    );

    const selectedCandidate = (activeCandidates.length > 0
        ? activeCandidates
        : candidates
    ).sort(
        (first, second) =>
            getCareerStartTime(second.career.start) -
            getCareerStartTime(first.career.start),
    )[0];

    if (!selectedCandidate) {
        return null;
    }

    const nationality = selectedCandidate.coach.nationality;

    return {
        id: String(selectedCandidate.coach.id),
        name: selectedCandidate.coach.name,
        image: selectedCandidate.coach.photo,
        flag: getCountryFlagUrl(nationality),
        country: nationality ?? "-",
        number: "-",
        age: selectedCandidate.coach.age
            ? String(selectedCandidate.coach.age)
            : "-",
        link: `/public/coach-details/${selectedCandidate.coach.id}`,
    };
};

const getPlayerPrimaryStatistic = (
    player: FootballPlayerEntry,
    teamId: string,
) => {
    const teamStatistics = player.statistics.filter(
        (statistic) => String(statistic.team.id) === teamId,
    );

    return teamStatistics.reduce<(typeof teamStatistics)[number] | null>(
        (selectedStatistic, statistic) => {
            if (!selectedStatistic) {
                return statistic;
            }

            const selectedMinutes = selectedStatistic.games.minutes ?? 0;
            const currentMinutes = statistic.games.minutes ?? 0;

            return currentMinutes > selectedMinutes
                ? statistic
                : selectedStatistic;
        },
        null,
    );
};

const getSquadGroupTitle = (position: string | null | undefined) => {
    switch (position) {
        case "Goalkeeper":
            return "Goalkeepers";
        case "Defender":
            return "Defenders";
        case "Midfielder":
            return "Midfielders";
        case "Attacker":
            return "Attackers";
        default:
            return "Others";
    }
};

export const mapTeamSquadGroups = (
    players: FootballPlayerEntry[],
    teamId: string,
): TeamSquadGroup[] => {
    const groups = new Map<string, TeamSquadMember[]>();

    players.forEach((entry) => {
        const statistic = getPlayerPrimaryStatistic(entry, teamId);
        const groupTitle = getSquadGroupTitle(statistic?.games.position);
        const nationality = entry.player.nationality;

        const member: TeamSquadMember = {
            id: String(entry.player.id),
            name: entry.player.name,
            image: entry.player.photo,
            flag: getCountryFlagUrl(nationality),
            country: nationality ?? "-",
            number: statistic?.games.number
                ? String(statistic.games.number)
                : "-",
            age: entry.player.age ? String(entry.player.age) : "-",
            link: `/public/player-details/${entry.player.id}`,
        };

        const currentGroup = groups.get(groupTitle) ?? [];
        currentGroup.push(member);
        groups.set(groupTitle, currentGroup);
    });

    return GROUP_ORDER.flatMap((title) => {
        const groupPlayers = groups.get(title);

        if (!groupPlayers || groupPlayers.length === 0) {
            return [];
        }

        return [
            {
                title,
                players: groupPlayers,
            },
        ];
    });
};