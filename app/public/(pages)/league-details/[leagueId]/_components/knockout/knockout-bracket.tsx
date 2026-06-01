import Card from "@/components/UI/cards/card";
import { knockoutMatches } from "@/mock/match-details/match-knockout.mock.data";
import type { KnockoutMatch } from "@/mock/match-details/match-knockout.mock.types";

//*============= Knockout Bracket =============*//
export default function KnockoutBracket() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-x-auto border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white pt-5"
    >
      <div className="relative min-h-[620px] min-w-[1300px] rounded-2xl bg-[#F4F8F6] dark:bg-[#13211D]">
        {knockoutMatches.map((match) => (
          <BracketMatch key={match.id} match={match} />
        ))}
      </div>
    </Card>
  );
}

//*============= Bracket Match =============*//
function BracketMatch({ match }: { match: KnockoutMatch }) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 ${
        match.isFinal
          ? "w-[150px] border-yellow-400 bg-[#25302b]"
          : "w-[120px] border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/10 dark:bg-dark-green"
      }`}
      style={{
        left: match.position.left,
        top: match.position.top,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <TeamMini name={match.homeShortName} isFinal={match.isFinal} />
        <TeamMini name={match.awayShortName} isFinal={match.isFinal} />
      </div>

      {match.isFinal ? (
        <div className="mt-3 text-center">
          <p className="text-xs font-semibold text-[#6B7A75] dark:text-white/55">
            {match.date}
          </p>
          <span className="mt-2 inline-flex rounded bg-yellow-400 px-3 py-1 text-xs font-bold text-[#10201B]">
            {match.score}
          </span>
        </div>
      ) : (
        <p className="mt-3 text-center text-sm font-bold">{match.score}</p>
      )}
    </div>
  );
}

//*============= Team Mini =============*//
function TeamMini({ name, isFinal }: { name: string; isFinal?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`size-5 rounded-full border ${
          isFinal
            ? "border-[#475569] bg-[#475569]"
            : "border-[#64748B] bg-[#101A17]"
        }`}
      />

      <span className="text-xs font-bold text-[#6B7A75] dark:text-white/55">
        {name}
      </span>
    </div>
  );
}
