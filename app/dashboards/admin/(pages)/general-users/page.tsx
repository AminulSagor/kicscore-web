import GeneralUsersHeader from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-header";
import GeneralUsersSearch from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-search";
import GeneralUsersTable from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-table";
import { generalUsersMockData } from "@/mock/admin/general-users/general-users.mock.data";

export default function GeneralUsersPage() {
  return (
    <section className="text-[#10201B] dark:text-white">
      <GeneralUsersHeader />
      <GeneralUsersSearch />
      <GeneralUsersTable users={generalUsersMockData} />
    </section>
  );
}
