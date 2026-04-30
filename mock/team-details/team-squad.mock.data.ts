import { IMAGE } from "@/constants/image.path";
import type { TeamSquadGroup, TeamSquadMember } from "./team-squad.mock.types";

export const teamCoach: TeamSquadMember = {
  id: "coach-1",
  name: "Mikel Arteta",
  country: "Spain",
  flag: "🇪🇸",
  image: IMAGE.profile_image,
  age: 31,
};

const squadPlayer = (id: string, name = "Player name"): TeamSquadMember => ({
  id,
  name,
  country: "Spain",
  flag: "🇪🇸",
  image: IMAGE.profile_image,
  number: 13,
  age: 31,
});

export const teamSquadGroups: TeamSquadGroup[] = [
  {
    title: "Keepers",
    players: [squadPlayer("keeper-1"), squadPlayer("keeper-2")],
  },
  {
    title: "Defenders",
    players: [squadPlayer("defender-1"), squadPlayer("defender-2")],
  },
  {
    title: "Midfielders",
    players: [squadPlayer("midfielder-1"), squadPlayer("midfielder-2")],
  },
  {
    title: "Forwards",
    players: [squadPlayer("forward-1"), squadPlayer("forward-2")],
  },
];
