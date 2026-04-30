import { IMAGE } from "@/constants/image.path";
import type { TeamTrophy } from "./team-trophies.mock.types";

const years = [
  "2003/04",
  "2001/02",
  "Year3",
  "Year4",
  "Year5",
  "Year6",
  "Year7",
  "Year8",
  "Year9",
  "Year10",
  "Year11",
  "Year12",
  "Year13",
];

export const teamTrophies: TeamTrophy[] = [
  {
    id: "premier-league",
    title: "Premiere League",
    logo: IMAGE.fc_porto,
    achievements: [
      { id: "pl-winner", count: 13, title: "Winner", years },
      { id: "pl-runner", count: 12, title: "Runner-Up", years },
    ],
  },
  {
    id: "champions-league",
    title: "Champions League",
    logo: IMAGE.fc_porto,
    achievements: [
      { id: "cl-winner", count: 13, title: "Winner", years },
      { id: "cl-runner", count: 12, title: "Runner-Up", years },
    ],
  },
  {
    id: "championship",
    title: "Championship",
    logo: IMAGE.fc_porto,
    fullWidth: true,
    achievements: [
      { id: "champ-runner", count: 12, title: "Runner-Up", years },
    ],
  },
  {
    id: "europa-league",
    title: "Europa League",
    logo: IMAGE.fc_porto,
    fullWidth: true,
    achievements: [
      { id: "el-winner", count: 13, title: "Winner", years },
      { id: "el-runner", count: 12, title: "Runner-Up", years },
    ],
  },
];
