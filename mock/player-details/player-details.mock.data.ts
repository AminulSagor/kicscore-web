import type { PlayerDetailsMock } from "./player-details.mock.types";

export const playerDetailsMockData: PlayerDetailsMock[] = [
  {
    id: "1",
    name: "Cristiano Ronaldo",
    club: "Al Nassr FC",
    stats: [
      { label: "Nationality", value: "POR" },
      { label: "Jersey", value: "7" },
      { label: "Height", value: "6ft 2in" },
      { label: "Age", value: "41 years" },
    ],
    position: {
      label: "Main Position",
      value: "Primary Striker",
    },
    season: "Saudi Pro League 2025/2026",
    seasonStats: [
      { label: "Matches", value: "24" },
      { label: "Assists", value: "2" },
      { label: "Goals", value: "24" },
    ],
    traits: [
      { label: "Defensive Contrib.", value: 2 },
      { label: "Goals", value: 100 },
      { label: "Shot Attempts", value: 100 },
      { label: "Touches", value: 38 },
      { label: "Chances Created", value: 41 },
      { label: "Aerial Won", value: 18 },
    ],
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
    matchGroups: [
      {
        id: "club",
        team: "Al Nassr FC",
        country: "Saudi Arabia",
        matches: [
          {
            id: "1",
            opponent: "Al Akhdoud",
            score: "2 - 0",
            date: "APR 12, 26",
            league: "Saudi Pro League",
            goal: "1 Goal",
            minute: "82'",
          },
          {
            id: "2",
            opponent: "Al Akhdoud",
            score: "2 - 0",
            date: "APR 12, 26",
            league: "Saudi Pro League",
            goal: "1 Goal",
            minute: "82'",
          },
          {
            id: "3",
            opponent: "Al Akhdoud",
            score: "2 - 0",
            date: "APR 12, 26",
            league: "Saudi Pro League",
            goal: "1 Goal",
            minute: "82'",
          },
        ],
      },
      {
        id: "country",
        team: "Portugal",
        country: "International",
        matches: [
          {
            id: "4",
            opponent: "Al Akhdoud",
            score: "2 - 0",
            date: "APR 12, 26",
            league: "Saudi Pro League",
            goal: "1 Goal",
            minute: "82'",
          },
        ],
      },
    ],
    performanceGroups: [
      {
        id: "shooting",
        title: "Shooting",
        stats: [
          { label: "Goals", value: "3" },
          { label: "Penalty Goals", value: "3" },
          { label: "Shots", value: "3" },
          { label: "Shots On Target", value: "3" },
          { label: "Headed Shots", value: "3" },
        ],
      },
      {
        id: "passing",
        title: "Passing",
        stats: [
          { label: "Metric 1", value: "3" },
          { label: "Metric 2", value: "3" },
        ],
      },
      {
        id: "possession",
        title: "Possession",
        stats: [
          { label: "Metric 1", value: "3" },
          { label: "Metric 2", value: "3" },
        ],
      },
      {
        id: "defending",
        title: "Defending",
        stats: [
          { label: "Metric 1", value: "3" },
          { label: "Metric 2", value: "3" },
        ],
      },
      {
        id: "discipline",
        title: "Discipline",
        stats: [
          { label: "Yellow Cards", value: "1", variant: "warning" },
          { label: "Red Cards", value: "0" },
        ],
      },
    ],
    careerGroups: [
      {
        id: "senior-career",
        title: "Senior Career",
        items: [
          {
            id: "career-1",
            club: "Al Nassr FC",
            period: "JAN 2023 - NOW",
            stats: [
              { label: "Matches Played", value: "3" },
              { label: "Goals", value: "3" },
            ],
          },
          {
            id: "career-2",
            club: "Man United",
            period: "AUG 2021 - NOV 2022",
            stats: [
              { label: "Matches Played", value: "54" },
              { label: "Goals", value: "27" },
            ],
          },
          {
            id: "career-3",
            club: "Juventus",
            period: "JUL 2018 - AUG 2021",
            stats: [
              { label: "Matches Played", value: "134" },
              { label: "Goals", value: "101" },
            ],
          },
          {
            id: "career-4",
            club: "",
            period: "",
            isPlaceholder: true,
            stats: [
              { label: "Matches Played", value: "-" },
              { label: "Goals", value: "-" },
            ],
          },
          {
            id: "career-5",
            club: "",
            period: "",
            isPlaceholder: true,
            stats: [
              { label: "Matches Played", value: "-" },
              { label: "Goals", value: "-" },
            ],
          },
        ],
      },
      {
        id: "national-team",
        title: "National Team",
        items: [
          {
            id: "national-1",
            club: "Portugal",
            period: "JAN 2023 - MAR 2026",
            stats: [
              { label: "Matches Played", value: "226" },
              { label: "Goals", value: "143" },
            ],
          },
        ],
      },
    ],
  },
];