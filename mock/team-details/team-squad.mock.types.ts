export type TeamSquadMember = {
  id: string;
  name: string;
  country: string;
  flag: string;
  image: string;
  age: number;
  number?: number;
  link?: string;
};

export type TeamSquadGroup = {
  title: string;
  players: TeamSquadMember[];
};
