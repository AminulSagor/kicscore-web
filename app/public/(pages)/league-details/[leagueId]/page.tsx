import { leagueHeaderMockData } from "@/mock/league-details/league-details.mock.data";
import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import OverviewTab from "./_components/overview/overview-tab";

type LeagueDetailsPageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function page({ searchParams }: LeagueDetailsPageProps) {
  const params = await searchParams;
  const activeTab = params?.tab ?? "overview";

  return (
    <main>
      <div className="mx-auto">
        <LeagueDetailsHeader league={leagueHeaderMockData} />
        <LeagueDetailsTabs />

        {activeTab === "overview" && <OverviewTab />}

        {activeTab !== "overview" && (
          <div className="mt-8 rounded-2xl border border-[#DDE8E3] bg-white p-8 text-center text-sm font-semibold text-[#6B7A75] dark:border-white/10 dark:bg-[#111d1a] dark:text-white/60">
            This tab will be added next.
          </div>
        )}
      </div>
    </main>
  );
}
