export type TeamSquadMember = {
  id: string;
  name: string;
  country: string;
  flag: string;
  image: string;
  age: number;
  number?: number;
};

export type TeamSquadGroup = {
  title: string;
  players: TeamSquadMember[];
};