import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";

export default function AboutMatchCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">About the match</h3>
      </div>

      <div className="max-w-[460px] p-5">
        <p className="text-sm font-medium leading-7 text-[#10201B] dark:text-white">
          <span className="text-mint-green">Barcelona</span> faces{" "}
          <span className="text-mint-green">Atletico Madrid</span> at{" "}
          <span className="text-mint-green">Spotify Camp Nou</span> on Wed, Apr
          8, 2026, 19:00 UTC. This match is part of the{" "}
          <span className="text-mint-green">Champions League</span>. You can
          check the recent head-to-head encounters, as well as full H2H record
          on this page to see how{" "}
          <span className="text-mint-green">Barcelona</span> and{" "}
          <span className="text-mint-green">Atletico Madrid</span> have fared
          against each other in the past.
        </p>

        <Button rounded="lg" size="base" className="mt-5 px-5">
          Expand
        </Button>
      </div>
    </Card>
  );
}