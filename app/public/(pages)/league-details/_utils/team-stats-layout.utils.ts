import type { TeamStatId } from "@/app/public/(pages)/league-details/_utils/team-stats.utils";

type GetTeamStatCardLayoutClassNameParams = {
  statId: TeamStatId;
};

//======= Get Team Stat Card Layout Class Name =======//
export const getTeamStatCardLayoutClassName = ({
  statId: _statId,
}: GetTeamStatCardLayoutClassNameParams) => {
  return "col-span-12 md:col-span-6 xl:col-span-4";
};
