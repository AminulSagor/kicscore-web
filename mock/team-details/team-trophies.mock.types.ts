export type TeamTrophyAchievement = {
  id: string;
  count: number;
  title: string;
  years: string[];
};

export type TeamTrophy = {
  id: string;
  title: string;
  logo: string;
  achievements: TeamTrophyAchievement[];
  fullWidth?: boolean;
};
