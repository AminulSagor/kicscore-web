import HeadToHeadMatchesCard from "./head-to-head-matches-card";
import HeadToHeadOverviewCard from "./head-to-head-overview-card";

//*============= Head To Head Tab =============*//
export default function HeadToHeadTab() {
  return (
    <div className="mt-8 space-y-5">
      <HeadToHeadOverviewCard />
      <HeadToHeadMatchesCard />
    </div>
  );
}
