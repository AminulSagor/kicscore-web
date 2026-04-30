import { teamTrophies } from "@/mock/team-details/team-trophies.mock.data";

import TrophyCard from "./trophy-card";

export default function TeamTrophiesTab() {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2 pb-8">
      {teamTrophies.map((trophy) => (
        <div
          key={trophy.id}
          className={trophy.fullWidth ? "lg:col-span-2" : ""}
        >
          <TrophyCard trophy={trophy} />
        </div>
      ))}
    </section>
  );
}
