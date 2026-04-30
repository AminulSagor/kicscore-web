import { IMAGE } from "@/constants/image.path";
import type { LineupPerson, TeamFormation } from "./match-lineup.mock.types";

export const matchLineups: TeamFormation[] = [
  {
    teamName: "Barcelona",
    formation: "4-2-3-1",
    side: "home",
    players: [
      {
        id: "h1",
        name: "Player",
        image: IMAGE.profile_image,
        position: { left: "50%", top: "8%" },
      },
      { id: "h2", name: "Player", position: { left: "10%", top: "20%" } },
      { id: "h3", name: "Player", position: { left: "35%", top: "20%" } },
      { id: "h4", name: "Player", position: { left: "65%", top: "20%" } },
      { id: "h5", name: "Player", position: { left: "90%", top: "20%" } },
      { id: "h6", name: "Player", position: { left: "42%", top: "34%" } },
      { id: "h7", name: "Player", position: { left: "58%", top: "34%" } },
      { id: "h8", name: "Player", position: { left: "10%", top: "48%" } },
      { id: "h9", name: "Player", position: { left: "50%", top: "48%" } },
      { id: "h10", name: "Player", position: { left: "90%", top: "48%" } },
      { id: "h11", name: "Player", position: { left: "50%", top: "62%" } },
    ],
  },
  {
    teamName: "Atletico Madrid",
    formation: "4-4-2",
    side: "away",
    players: [
      {
        id: "a1",
        name: "Player",
        image: IMAGE.celebration1,
        position: { left: "44%", top: "72%" },
      },
      {
        id: "a2",
        name: "Player",
        image: IMAGE.celebration1,
        position: { left: "56%", top: "72%" },
      },
      { id: "a3", name: "Player", position: { left: "10%", top: "82%" } },
      { id: "a4", name: "Player", position: { left: "35%", top: "82%" } },
      { id: "a5", name: "Player", position: { left: "65%", top: "82%" } },
      { id: "a6", name: "Player", position: { left: "90%", top: "82%" } },
      { id: "a7", name: "Player", position: { left: "10%", top: "92%" } },
      { id: "a8", name: "Player", position: { left: "35%", top: "92%" } },
      { id: "a9", name: "Player", position: { left: "65%", top: "92%" } },
      { id: "a10", name: "Player", position: { left: "90%", top: "92%" } },
      { id: "a11", name: "Player", position: { left: "50%", top: "104%" } },
    ],
  },
];

export const matchCoaches: LineupPerson[] = [
  { id: "coach-1", name: "Player", image: IMAGE.profile_image },
  { id: "coach-2", name: "Player", image: IMAGE.fc_porto },
];

export const matchSubstitutes: LineupPerson[] = Array.from(
  { length: 12 },
  (_, index) => ({
    id: `sub-${index + 1}`,
    name: "Player",
    image:
      index % 3 === 0
        ? IMAGE.profile_image
        : index % 3 === 1
          ? IMAGE.fc_porto
          : IMAGE.portugal,
  }),
);

export const matchBench: LineupPerson[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `bench-${index + 1}`,
    name: "Player",
    image: index % 2 === 0 ? IMAGE.profile_image : IMAGE.fc_porto,
  }),
);
