import MatchCard from "@/app/public/(pages)/home/_components/matches/match-card";
import { matchPreviewMockData } from "@/mock/matches/matches.mock.data";

const MatchTopSection = () => {
  return (
    <div className="grid gap-4">
      {matchPreviewMockData.map((group) => (
        <MatchCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default MatchTopSection;
