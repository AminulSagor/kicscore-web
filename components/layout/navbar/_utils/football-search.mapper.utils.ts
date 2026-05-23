import type {
  ApiLeagueSearchItem,
  ApiPlayerSearchItem,
  ApiTeamSearchItem,
  FootballSearchResult,
  FootballSearchSourceData,
  SearchCategory,
} from "@/types/search/football-search.types";

const FILTERED_CATEGORY_RESULT_LIMIT = 10;
const ALL_CATEGORY_RESULT_LIMIT = 4;
const ALL_RESULT_LIMIT = 12;

type MapFootballSearchResultsParams = {
  query: string;
  category: SearchCategory;
  sourceData: FootballSearchSourceData;
};

//======= Normalize Search Text =======//
const normalizeSearchText = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

//======= Get Search Relevance Score =======//
const getSearchRelevanceScore = (name: string, query: string) => {
  const normalizedName = normalizeSearchText(name);
  const normalizedQuery = normalizeSearchText(query);
  const words = normalizedName.split(/\s+/);

  if (normalizedName === normalizedQuery) return 0;
  if (words.includes(normalizedQuery)) return 1;
  if (normalizedName.startsWith(normalizedQuery)) return 2;
  if (normalizedName.includes(normalizedQuery)) return 3;

  return 4;
};

//======= Sort API Results By Relevance =======//
const sortByRelevance = <T>(
  items: T[],
  query: string,
  getName: (item: T) => string,
) => {
  return [...items].sort((firstItem, secondItem) => {
    const firstScore = getSearchRelevanceScore(getName(firstItem), query);
    const secondScore = getSearchRelevanceScore(getName(secondItem), query);

    return firstScore - secondScore;
  });
};

//======= Map Team Results =======//
const mapTeamResults = (
  teams: ApiTeamSearchItem[],
  query: string,
  limit: number,
): FootballSearchResult[] => {
  return sortByRelevance(teams, query, (item) => item.team.name)
    .slice(0, limit)
    .map((item) => ({
      id: item.team.id,
      category: "teams",
      name: item.team.name,
      subtitle: `Team • ${item.team.country ?? "Unknown country"}`,
      image: item.team.logo,
      href: `/public/team-details/${item.team.id}`,
    }));
};

//======= Map League Results =======//
const mapLeagueResults = (
  leagues: ApiLeagueSearchItem[],
  query: string,
  limit: number,
): FootballSearchResult[] => {
  return sortByRelevance(leagues, query, (item) => item.league.name)
    .slice(0, limit)
    .map((item) => ({
      id: item.league.id,
      category: "leagues",
      name: item.league.name,
      subtitle: `League • ${item.country.name}`,
      image: item.league.logo,
      href: `/public/league-details/${item.league.id}`,
    }));
};

//======= Map Player Results =======//
const mapPlayerResults = (
  players: ApiPlayerSearchItem[],
  query: string,
  limit: number,
): FootballSearchResult[] => {
  return sortByRelevance(players, query, (item) => item.player.name)
    .slice(0, limit)
    .map((item) => ({
      id: item.player.id,
      category: "players",
      name: item.player.name,
      subtitle: `${item.player.position ?? "Player"} • ${
        item.player.nationality ?? "Unknown country"
      }`,
      image: item.player.photo,
      href: `/public/player-details/${item.player.id}`,
    }));
};

//======= Sort Mapped Results By Relevance =======//
const sortMappedResultsByRelevance = (
  results: FootballSearchResult[],
  query: string,
) => {
  return [...results].sort((firstResult, secondResult) => {
    const firstScore = getSearchRelevanceScore(firstResult.name, query);
    const secondScore = getSearchRelevanceScore(secondResult.name, query);

    return firstScore - secondScore;
  });
};

//======= Map Football Search Results =======//
export const mapFootballSearchResults = ({
  query,
  category,
  sourceData,
}: MapFootballSearchResultsParams): FootballSearchResult[] => {
  if (category === "teams") {
    return mapTeamResults(
      sourceData.teams,
      query,
      FILTERED_CATEGORY_RESULT_LIMIT,
    );
  }

  if (category === "leagues") {
    return mapLeagueResults(
      sourceData.leagues,
      query,
      FILTERED_CATEGORY_RESULT_LIMIT,
    );
  }

  if (category === "players") {
    return mapPlayerResults(
      sourceData.players,
      query,
      FILTERED_CATEGORY_RESULT_LIMIT,
    );
  }

  const results = [
    ...mapTeamResults(sourceData.teams, query, ALL_CATEGORY_RESULT_LIMIT),
    ...mapLeagueResults(sourceData.leagues, query, ALL_CATEGORY_RESULT_LIMIT),
    ...mapPlayerResults(sourceData.players, query, ALL_CATEGORY_RESULT_LIMIT),
  ];

  return sortMappedResultsByRelevance(results, query).slice(
    0,
    ALL_RESULT_LIMIT,
  );
};
