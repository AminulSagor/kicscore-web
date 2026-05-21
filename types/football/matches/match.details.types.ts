export type MatchApiErrors = [] | Record<string, string | string[]>;

export interface MatchDetailsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MatchDetailsData;
  timestamp: string;
  path: string;
}

export interface MatchDetailsData {
  get: string;
  parameters: MatchDetailsParameters;
  errors: MatchApiErrors;
  results: number;
  paging: MatchDetailsPaging;
  response: MatchDetailsItem[];
  follow: MatchDetailsFollow;
}

export interface MatchDetailsParameters {
  ids: string;
}

export interface MatchDetailsPaging {
  current: number;
  total: number;
}

export interface MatchDetailsResult {
  match: MatchDetailsItem | null;
  follow: MatchDetailsFollow | null;
}

export interface MatchDetailsFollow {
  isFollowed: boolean;
  entityType: "FIXTURE";
  entityId: string;
}

export interface MatchDetailsItem {
  fixture: MatchFixtureInfo;
  league: MatchLeagueInfo;
  teams: MatchTeamsInfo;
  goals: MatchGoalsInfo;
  score: MatchScoreInfo;
  events: MatchEventItem[];
  lineups: MatchLineupItem[];
  statistics: MatchStatisticTeamItem[];
  players: MatchPlayerTeamStatsItem[];
}

export interface MatchFixtureInfo {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: MatchFixturePeriods;
  venue: MatchVenueInfo;
  status: MatchStatusInfo;
}

export interface MatchFixturePeriods {
  first: number | null;
  second: number | null;
}

export interface MatchVenueInfo {
  id: number | null;
  name: string | null;
  city: string | null;
}

export interface MatchStatusInfo {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface MatchLeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string | null;
  flag: string | null;
  season: number;
  round: string;
  standings: boolean;
}

export interface MatchTeamsInfo {
  home: MatchTeamInfo;
  away: MatchTeamInfo;
}

export interface MatchTeamInfo {
  id: number;
  name: string;
  logo: string | null;
  winner: boolean | null;
}

export interface MatchGoalsInfo {
  home: number | null;
  away: number | null;
}

export interface MatchScoreInfo {
  halftime: MatchScoreValue;
  fulltime: MatchScoreValue;
  extratime: MatchScoreValue;
  penalty: MatchScoreValue;
}

export interface MatchScoreValue {
  home: number | null;
  away: number | null;
}

export interface MatchEventItem {
  time: MatchEventTime;
  team: MatchEventTeam;
  player: MatchEventPerson;
  assist: MatchEventPerson;
  type: string;
  detail: string;
  comments: string | null;
}

export interface MatchEventTime {
  elapsed: number | null;
  extra: number | null;
}

export interface MatchEventTeam {
  id: number;
  name: string;
  logo: string | null;
}

export interface MatchEventPerson {
  id: number | null;
  name: string | null;
}

export interface MatchLineupItem {
  team: MatchLineupTeam;
  coach: MatchCoachInfo;
  formation: string | null;
  startXI: MatchLineupPlayerWrapper[];
  substitutes: MatchLineupPlayerWrapper[];
}

export interface MatchLineupTeam {
  id: number;
  name: string;
  logo: string | null;
  colors: MatchLineupColors | null;
}

export interface MatchLineupColors {
  player: MatchLineupColorSet;
  goalkeeper: MatchLineupColorSet;
}

export interface MatchLineupColorSet {
  primary: string | null;
  number: string | null;
  border: string | null;
}

export interface MatchCoachInfo {
  id: number | null;
  name: string | null;
  photo?: string | null;
}

export interface MatchLineupPlayerWrapper {
  player: MatchLineupPlayer;
}

export interface MatchLineupPlayer {
  id: number | null;
  name: string | null;
  number: number | null;
  pos: string | null;
  grid: string | null;
}

export interface MatchStatisticTeamItem {
  team: MatchEventTeam;
  statistics: MatchStatisticItem[];
}

export interface MatchStatisticItem {
  type: string;
  value: string | number | null;
}

export interface MatchPlayerTeamStatsItem {
  team: MatchEventTeam;
  players: MatchPlayerStatsItem[];
}

export interface MatchPlayerStatsItem {
  player: MatchPlayerInfo;
  statistics: MatchPlayerStatistic[];
}

export interface MatchPlayerInfo {
  id: number | null;
  name: string | null;
  photo: string | null;
}

export interface MatchPlayerStatistic {
  games?: MatchPlayerGamesStat;
  offsides?: number | null;
  shots?: MatchPlayerShotsStat;
  goals?: MatchPlayerGoalsStat;
  passes?: MatchPlayerPassesStat;
  tackles?: MatchPlayerTacklesStat;
  duels?: MatchPlayerDuelsStat;
  dribbles?: MatchPlayerDribblesStat;
  fouls?: MatchPlayerFoulsStat;
  cards?: MatchPlayerCardsStat;
  penalty?: MatchPlayerPenaltyStat;
}

export interface MatchPlayerGamesStat {
  minutes: number | null;
  number: number | null;
  position: string | null;
  rating: string | null;
  captain: boolean;
  substitute: boolean;
}

export interface MatchPlayerShotsStat {
  total: number | null;
  on: number | null;
}

export interface MatchPlayerGoalsStat {
  total: number | null;
  conceded: number | null;
  assists: number | null;
  saves: number | null;
}

export interface MatchPlayerPassesStat {
  total: number | null;
  key: number | null;
  accuracy: string | number | null;
}

export interface MatchPlayerTacklesStat {
  total: number | null;
  blocks: number | null;
  interceptions: number | null;
}

export interface MatchPlayerDuelsStat {
  total: number | null;
  won: number | null;
}

export interface MatchPlayerDribblesStat {
  attempts: number | null;
  success: number | null;
  past: number | null;
}

export interface MatchPlayerFoulsStat {
  drawn: number | null;
  committed: number | null;
}

export interface MatchPlayerCardsStat {
  yellow: number | null;
  red: number | null;
}

export interface MatchPlayerPenaltyStat {
  won: number | null;
  commited: number | null;
  scored: number | null;
  missed: number | null;
  saved: number | null;
}
