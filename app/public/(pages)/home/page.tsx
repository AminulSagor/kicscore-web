import LeagueSidebar from "@/app/public/(pages)/home/_components/league-sidebar/league-sidebar";
import MatchSection from "@/app/public/(pages)/home/_components/matches/match-section";
import MatchTopSection from "@/app/public/(pages)/home/_components/matches/match-top-section";
import NewsAccordion from "@/app/public/(pages)/home/_components/news/news-accordion";
import { AdsterraBannerAd } from "@/components/ads/AdsterraBannerAd";
import { AdsterraNativeBanner } from "@/components/ads/AdsterraNativeBanner";
import {
  ADSTERRA_BANNER_ZONES,
  ADSTERRA_NATIVE_ZONES,
} from "@/utils/ads/adsterra-zones";

const Home = () => {
  return (
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_336px]">
      <div className="flex min-w-0 flex-col gap-4">
        <MatchTopSection />

        <AdsterraNativeBanner
          {...ADSTERRA_NATIVE_ZONES.homeAfterLive}
          className="my-4"
          minHeightClassName="min-h-[130px]"
        />

        <div className="space-y-4 lg:hidden">
          <NewsAccordion />
          <LeagueSidebar />
        </div>

        <MatchSection />
      </div>

      <div className="min-w-0">
        <div className="hidden space-y-4 lg:block">
          <NewsAccordion />

          <AdsterraBannerAd
            {...ADSTERRA_BANNER_ZONES.banner320x50}
            className="mt-4 hidden xl:flex"
          />

          <LeagueSidebar />

          <AdsterraBannerAd
            {...ADSTERRA_BANNER_ZONES.banner300x250}
            className="my-4 hidden xl:flex"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
