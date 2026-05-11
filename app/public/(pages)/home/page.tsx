import LeagueSidebar from "@/app/public/(pages)/home/_components/league-sidebar/league-sidebar";
import MatchSection from "@/app/public/(pages)/home/_components/matches/match-section";
import MatchTopSection from "@/app/public/(pages)/home/_components/matches/match-top-section";
import NewsAccordion from "@/app/public/(pages)/home/_components/news/news-accordion";

const Home = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px] items-start">
      <div className="flex flex-col gap-4">
        <MatchTopSection />
        <div className="space-y-4 lg:hidden">
          <NewsAccordion />
          <LeagueSidebar />
        </div>
        <MatchSection />
      </div>
      <div>
        <div className="space-y-4 hidden lg:block">
          <NewsAccordion />
          <LeagueSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
