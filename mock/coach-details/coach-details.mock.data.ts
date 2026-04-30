import type { CoachDetailsMock } from "./coach-details.mock.types";

export const coachDetailsMockData: CoachDetailsMock[] = [
    {
        id: "1",
        name: "Diego Simeone",
        role: "Atletico Madrid",
        countryCode: "ARG",
        stats: [
            { label: "Country", value: "ARG" },
            { label: "Feb 1, 1985", value: "41 years" },
        ],
        club: {
            name: "Atletico Madrid",
            matches: "790",
            ratings: [
                { label: "Wins", amount: "466", value: 82 },
                { label: "Draw", amount: "167", value: 82 },
                { label: "Losses", amount: "157", value: 68 },
            ],
        },
        trophies: [
            {
                id: "1",
                title: "Sudamericano U20",
                country: "South-America",
                season: "Peru 2011",
                result: "Winner",
            },
            {
                id: "2",
                title: "Trophee des Champions",
                country: "France",
                season: "2019/2020",
                result: "Winner",
            },
        ],
        career: [
            { id: "1", club: "Atletico Madrid", period: "DEC 2011 - NOW" },
            { id: "2", club: "Racing Club", period: "JUN 2011 - DEC 2011" },
            { id: "3", club: "Catania", period: "JAN 2011 - MAY 2011" },
            { id: "4", club: "", period: "" },
            { id: "5", club: "", period: "" },
        ],
    },
];