export type WorldCupSeasonMock = {
  year: number;
  winner: {
    name: string;
    logo: string;
  };
  runnerUp: {
    name: string;
    logo: string;
  };
};

export const worldCupSeasonsMockData: WorldCupSeasonMock[] = [
  {
    year: 2022,
    winner: {
      name: "Argentina",
      logo: "https://media.api-sports.io/football/teams/26.png", // Argentina
    },
    runnerUp: {
      name: "France",
      logo: "https://media.api-sports.io/football/teams/17.png", // France
    },
  },
  {
    year: 2018,
    winner: {
      name: "France",
      logo: "https://media.api-sports.io/football/teams/17.png", // France
    },
    runnerUp: {
      name: "Croatia",
      logo: "https://media.api-sports.io/football/teams/9.png", // Croatia
    },
  },
  {
    year: 2014,
    winner: {
      name: "Germany",
      logo: "https://media.api-sports.io/football/teams/25.png", // Germany
    },
    runnerUp: {
      name: "Argentina",
      logo: "https://media.api-sports.io/football/teams/26.png", // Argentina
    },
  },
];
