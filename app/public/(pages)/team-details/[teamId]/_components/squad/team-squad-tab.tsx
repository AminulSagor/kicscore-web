import {
  teamCoach,
  teamSquadGroups,
} from "@/mock/team-details/team-squad.mock.data";
import SquadSectionCard from "./squad-section-card";

export default function TeamSquadTab() {
  return (
    <section className="mt-8 space-y-6 pb-8">
      <SquadSectionCard
        title="Coach"
        players={[teamCoach]}
        showNumber={false}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {teamSquadGroups.map((group) => (
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
