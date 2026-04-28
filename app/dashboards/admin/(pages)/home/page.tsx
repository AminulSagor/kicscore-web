import { Download, Shield, Users, Zap } from "lucide-react";

import AdminFollowedCard from "@/app/dashboards/admin/(pages)/home/_components/admin-followed-card";
import AdminStatCard from "@/app/dashboards/admin/(pages)/home/_components/admin-stat-card";
import Button from "@/components/UI/buttons/button";
import {
  adminTopFollowedLeaguesMockData,
  adminTopFollowedTeamsMockData,
} from "@/mock/admin/home/admin-home.mock.data";

export default function AdminHome() {
  return (
    <section className="text-[#10201B] dark:text-white">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Dashboard Overview</h1>
          <p className="mt-2 text-sm uppercase text-[#6B7A75] dark:text-white/45">
            Today, Apr 19
          </p>
        </div>

        <Button size="base" className="w-fit text-sm font-bold">
          <Download size={15} />
          Export Report
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <AdminStatCard
          title="Total Users"
          value="14,205"
          growth="12%"
          icon={Users}
        />
        <AdminStatCard title="Total Managers" value="12" icon={Shield} />
        <AdminStatCard
          title="Active Today"
          value="3,402"
          growth="4%"
          icon={Zap}
        />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <AdminFollowedCard
          title="Top Followed Leagues"
          items={adminTopFollowedLeaguesMockData}
        />
        <AdminFollowedCard
          title="Top Followed Teams"
          items={adminTopFollowedTeamsMockData}
        />
      </div>
    </section>
  );
}
