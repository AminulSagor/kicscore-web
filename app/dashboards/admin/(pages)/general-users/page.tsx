import GeneralUsersHeader from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-header";
import GeneralUsersSearch from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-search";
import GeneralUsersTable from "@/app/dashboards/admin/(pages)/general-users/_components/general-users-table";
import { mapGeneralUsers } from "@/app/dashboards/admin/(pages)/general-users/_utils/general.users.utils";
import { getGeneralUsers } from "@/service/admin/general-users/general.users.server.service";

type GeneralUsersPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const getPositiveNumber = (value: string | undefined, fallback: number) => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
};

export default async function GeneralUsersPage({
  searchParams,
}: GeneralUsersPageProps) {
  const query = searchParams ? await searchParams : {};

  const page = getPositiveNumber(query.page, DEFAULT_PAGE);
  const limit = getPositiveNumber(query.limit, DEFAULT_LIMIT);
  const search = query.search?.trim() ?? "";

  const usersResponse = await getGeneralUsers({
    page,
    limit,
    search,
  });

  const users = mapGeneralUsers(usersResponse.data.items);

  return (
    <section className="text-[#10201B] dark:text-white">
      <GeneralUsersHeader totalUsers={usersResponse.data.meta.total} />

      <GeneralUsersSearch initialSearch={search} limit={limit} />

      <GeneralUsersTable users={users} />
    </section>
  );
}