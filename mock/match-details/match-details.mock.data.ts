import type { MatchDetailsTab } from "./match-details.mock.types";

export const matchDetailsTabs: { label: string; value: MatchDetailsTab }[] = [
  { label: "Facts", value: "facts" },
  { label: "Lineup", value: "lineup" },
  { label: "Knockout", value: "knockout" },
  { label: "Stats", value: "stats" },
  { label: "Head-to-head", value: "head-to-head" },
];
