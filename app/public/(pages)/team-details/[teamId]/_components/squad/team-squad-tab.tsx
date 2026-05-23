import type {
  TeamSquadGroup,
  TeamSquadMember,
} from "@/types/football/teams/team.squad.types";

import SquadSectionCard from "./squad-section-card";

type Props = {
  coach: TeamSquadMember | null;
  squadGroups: TeamSquadGroup[];
};

export default function TeamSquadTab({ coach, squadGroups }: Props) {
  return (
    <section className="mt-8 space-y-6 pb-8">
      {coach && (
        <SquadSectionCard
          title="Coach"
          players={[coach]}
          showNumber={false}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {squadGroups.map((group) => (
          <SquadSectionCard
            key={group.title}
            title={group.title}
            players={group.players}
          />
        ))}
      </div>
    </section>
  );
}