export type PitchSide = "home" | "away";

export type FormationPlayer = {
  id: string;
  name: string;
  position: {
    left: string;
    top: string;
  };
  image?: string;
};

export type TeamFormation = {
  teamName: string;
  formation: string;
  side: PitchSide;
  players: FormationPlayer[];
};

export type LineupPerson = {
  id: string;
  name: string;
  image?: string;
};
