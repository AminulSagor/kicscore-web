import LeagueSidebar from "@/app/public/(pages)/home/_components/league-sidebar/league-sidebar";
import MatchSection from "@/app/public/(pages)/home/_components/matches/match-section";
import NewsAccordion from "@/app/public/(pages)/home/_components/news/news-accordion";

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px] items-start">
        <div>
          <NewsAccordion />
          <MatchSection />
        </div>

        <LeagueSidebar />
      </div>
    </div>
  );
};

export default Home;
