export type PlayerOfTheMatch = {
  name: string;
  team: string;
  rating: number;
};

export type MatchTopStats = {
  possession: {
    home: number;
    away: number;
  };
  totalShots: {
    home: number;
    away: number;
  };
  bigChances: {
    home: number;
    away: number;
  };
};

export type MatchEventSide = "home" | "away" | "center";

export type MatchEventType =
  | "substitution"
  | "yellow-card"
  | "red-card"
  | "var"
  | "goal"
  | "period";

export type MatchEvent = {
  id: string;
  minute?: string;
  side: MatchEventSide;
  type: MatchEventType;
  title?: string;
  subtitle?: string;
  secondaryTitle?: string;
  score?: string;
};
