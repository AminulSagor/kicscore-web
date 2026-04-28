import CreateManagerCard from "@/app/dashboards/admin/(pages)/managers/_components/create-manager-card";
import ManagersTable from "@/app/dashboards/admin/(pages)/managers/_components/managers-table";
import { managersMockData } from "@/mock/admin/managers/managers.mock.data";

export default function ManagersPage() {
  return (
    <section className="text-[#10201B] dark:text-white">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">Managers</h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7A75] dark:text-white/45">
          Administration & Access Control
        </p>
      </div>

      <CreateManagerCard />

      <ManagersTable managers={managersMockData} />
    </section>
  );
}
