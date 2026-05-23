import type {
    CoachApiCareerItem,
    CoachApiItem,
    CoachApiTrophy,
    CoachDetails,
    CoachFollow,
    CoachRecord,
} from "@/types/football/coaches/coach.types";

type CoachRecordQueryParams = {
    teamId: string;
    fromDate: string;
    toDate: string;
};

type MapCoachDetailsParams = {
    coach: CoachApiItem;
    follow: CoachFollow;
    trophies: CoachApiTrophy[];
    record?: CoachRecord;
};

const getTodayDate = () => {
    return new Date().toISOString().slice(0, 10);
};

const formatDateLabel = (dateValue: string | null) => {
    if (!dateValue) return "Date unavailable";

    const date = new Date(`${dateValue}T00:00:00`);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const formatMonthYear = (dateValue: string | null) => {
    if (!dateValue) return "Now";

    const date = new Date(`${dateValue}T00:00:00`);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
};

const getRecordPercentage = (value: number, total: number) => {
    if (!total) return 0;

    return Math.round((value / total) * 100);
};

const getCurrentCareerItem = (coach: CoachApiItem) => {
    if (!coach.team) return coach.career[0] ?? null;

    return (
        coach.career.find((item) => item.team.id === coach.team?.id) ??
        coach.career[0] ??
        null
    );
};

export const getCoachRecordQueryParams = (
    coach: CoachApiItem,
): CoachRecordQueryParams | null => {
    const currentCareer = getCurrentCareerItem(coach);

    if (!coach.team?.id || !currentCareer?.start) {
        return null;
    }

    return {
        teamId: String(coach.team.id),
        fromDate: currentCareer.start,
        toDate: currentCareer.end ?? getTodayDate(),
    };
};

const mapCoachCareer = (career: CoachApiCareerItem[]) => {
    return career.map((item, index) => ({
        id: `${item.team.id}-${index}`,
        club: item.team.name,
        period: `${formatMonthYear(item.start).toUpperCase()} - ${formatMonthYear(
            item.end,
        ).toUpperCase()}`,
    }));
};

const mapCoachTrophies = (trophies: CoachApiTrophy[]) => {
    return trophies.map((trophy, index) => ({
        id: `${trophy.league}-${trophy.season}-${index}`,
        title: trophy.league,
        country: trophy.country,
        season: trophy.season,
        result: trophy.place,
    }));
};

export const mapCoachDetails = ({
    coach,
    follow,
    trophies,
    record,
}: MapCoachDetailsParams): CoachDetails => {
    const matches = record?.matches ?? 0;
    const wins = record?.wins ?? 0;
    const draws = record?.draws ?? 0;
    const losses = record?.losses ?? 0;

    return {
        id: String(coach.id),
        name: coach.name,
        avatar: coach.photo,
        role: coach.team?.name ?? "Coach",
        isFollowed: follow.isFollowed,
        stats: [
            {
                label: "Country",
                value: coach.nationality ?? "-",
            },
            {
                label: formatDateLabel(coach.birth.date),
                value: coach.age ? `${coach.age} years` : "-",
            },
        ],
        club: {
            name: coach.team?.name ?? "Unknown Team",
            matches,
            ratings: [
                {
                    label: "Wins",
                    amount: wins,
                    value: getRecordPercentage(wins, matches),
                },
                {
                    label: "Draw",
                    amount: draws,
                    value: getRecordPercentage(draws, matches),
                },
                {
                    label: "Losses",
                    amount: losses,
                    value: getRecordPercentage(losses, matches),
                },
            ],
        },
        trophies: mapCoachTrophies(trophies),
        career: mapCoachCareer(coach.career),
    };
};