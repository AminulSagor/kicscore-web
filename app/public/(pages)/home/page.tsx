import LeagueSidebar from "@/app/public/(pages)/home/_components/league-sidebar/league-sidebar";
import MatchSection from "@/app/public/(pages)/home/_components/matches/match-section";
import MatchTopSection from "@/app/public/(pages)/home/_components/matches/match-top-section";
import NewsAccordion from "@/app/public/(pages)/home/_components/news/news-accordion";

const Home = () => {
  return (
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="flex min-w-0 flex-col gap-4 overflow-hidden">
        <MatchTopSection />

        <div className="space-y-4 lg:hidden">
          <NewsAccordion />
          <LeagueSidebar />
        </div>

        <MatchSection />
      </div>

      <div className="min-w-0">
        <div className="hidden space-y-4 lg:block">
          <NewsAccordion />
          <LeagueSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
