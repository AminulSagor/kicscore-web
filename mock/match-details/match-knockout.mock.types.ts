export type KnockoutMatch = {
  id: string;
  homeShortName: string;
  awayShortName: string;
  score: string;
  position: {
    left: string;
    top: string;
  };
  isFinal?: boolean;
  date?: string;
};