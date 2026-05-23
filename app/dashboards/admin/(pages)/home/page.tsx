import { Shield, Users, Zap } from "lucide-react";

import AdminExportReportButton from "@/app/dashboards/admin/(pages)/home/_components/admin-export-report-button";
import AdminFollowedCard from "@/app/dashboards/admin/(pages)/home/_components/admin-followed-card";
import AdminStatCard from "@/app/dashboards/admin/(pages)/home/_components/admin-stat-card";
import {
  formatDashboardDate,
  formatDashboardNumber,
  mapAdminDashboardFollowedItems,
} from "@/app/dashboards/admin/(pages)/home/_utils/admin.dashboard.utils";
import {
  getAdminDashboardOverview,
  getAdminDashboardTopLeagues,
  getAdminDashboardTopTeams,
} from "@/service/admin/dashboard/admin.dashboard.server.service";

const TOP_ITEMS_PAGE = 1;
const TOP_ITEMS_LIMIT = 3;
const TOP_LEAGUES_ROUTE = "/dashboards/admin/top-leagues";
const TOP_TEAMS_ROUTE = "/dashboards/admin/top-teams";

export default async function AdminHome() {
  const [overviewResponse, leaguesResponse, teamsResponse] = await Promise.all([
    getAdminDashboardOverview(),
    getAdminDashboardTopLeagues({
      page: TOP_ITEMS_PAGE,
      limit: TOP_ITEMS_LIMIT,
    }),
    getAdminDashboardTopTeams({
      page: TOP_ITEMS_PAGE,
      limit: TOP_ITEMS_LIMIT,
    }),
  ]);

  const topFollowedLeagues = mapAdminDashboardFollowedItems(
    leaguesResponse.data.items,
  );

  const topFollowedTeams = mapAdminDashboardFollowedItems(
    teamsResponse.data.items,
  );

  const hasMoreLeagues =
    leaguesResponse.data.meta.total > leaguesResponse.data.items.length;

  const hasMoreTeams =
    teamsResponse.data.meta.total > teamsResponse.data.items.length;

  return (
    <section className="text-[#10201B] dark:text-white">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm uppercase text-[#6B7A75] dark:text-white/45">
            Today, {formatDashboardDate(overviewResponse.timestamp)}
          </p>
        </div>

        <AdminExportReportButton />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AdminStatCard
          title="Total Users"
          value={formatDashboardNumber(overviewResponse.data.totalUsers)}
          growth="12%"
          icon={Users}
        />

        {/* <AdminStatCard title="Total Managers" value="12" icon={Shield} /> */}

        <AdminStatCard
          title="Active Today"
          value={formatDashboardNumber(overviewResponse.data.activeToday)}
          growth="4%"
          icon={Zap}
        />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <AdminFollowedCard
          title="Top Followed Leagues"
          items={topFollowedLeagues}
          viewAllHref={hasMoreLeagues ? TOP_LEAGUES_ROUTE : undefined}
        />

        <AdminFollowedCard
          title="Top Followed Teams"
          items={topFollowedTeams}
          viewAllHref={hasMoreTeams ? TOP_TEAMS_ROUTE : undefined}
        />
      </div>
    </section>
  );
}