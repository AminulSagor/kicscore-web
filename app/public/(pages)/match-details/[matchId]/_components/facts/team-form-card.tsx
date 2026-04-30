import Card from "@/components/UI/cards/card";

const homeResults = ["1 - 0", "1 - 0", "7 - 2"];
const awayResults = ["1 - 2", "3 - 2", "3 - 2"];

export default function TeamFormCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Team form</h3>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-2">
        <FormColumn results={homeResults} type="win" />
        <FormColumn results={awayResults} type="loss" />
      </div>
    </Card>
  );
}

function FormColumn({
  results,
  type,
}: {
  results: string[];
  type: "win" | "loss";
}) {
  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div
          key={`${result}-${index}`}
          className="grid grid-cols-[40px_1fr_40px] items-center gap-4"
        >
          <span className="size-6 rounded-full border border-[#94A3B8]" />

          <span
            className={`mx-auto rounded-md px-3 py-1 text-xs font-bold ${
              type === "win"
                ? "bg-mint-green text-[#10201B]"
                : "bg-red text-white"
            }`}
          >
            {result}
          </span>

          <span className="size-6 rounded-full border border-[#94A3B8]" />
        </div>
      ))}
    </div>
  );
}