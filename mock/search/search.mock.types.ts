export type SearchCategory =
  | "all"
  | "teams"
  | "leagues"
  | "players"
  | "matches";

export type SearchItemMock = {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<SearchCategory, "all">;
  image: string;
};
