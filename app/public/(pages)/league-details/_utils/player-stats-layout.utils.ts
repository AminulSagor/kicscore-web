import type { PlayerStatId } from "@/app/public/(pages)/league-details/_utils/player-stats.utils";

type GetPlayerStatCardLayoutClassNameParams = {
  statId: PlayerStatId;
  firstMinutesStatId?: PlayerStatId;
};

const DEFAULT_CARD_LAYOUT = "col-span-12 sm:col-span-6 lg:col-span-4";
const FULL_WIDTH_CARD_LAYOUT = "col-span-12";
const TWO_COLUMN_CARD_LAYOUT = "col-span-12 sm:col-span-6 lg:col-span-6";
const FOUR_COLUMN_CARD_LAYOUT = "col-span-12 sm:col-span-6 lg:col-span-3";

//======= Get First Minutes Stat ID =======//
export const getFirstMinutesStatId = (
  statIds: PlayerStatId[],
): PlayerStatId | undefined => {
  return statIds.find((statId) => statId.startsWith("minutes:"));
};

//======= Get Player Stat Card Layout Class Name =======//
export const getPlayerStatCardLayoutClassName = ({
  statId,
  firstMinutesStatId,
}: GetPlayerStatCardLayoutClassNameParams): string => {
  if (statId === "top-scorers") {
    return FULL_WIDTH_CARD_LAYOUT;
  }

  if (statId === firstMinutesStatId) {
    return DEFAULT_CARD_LAYOUT;
  }

  if (statId.startsWith("minutes:")) {
    return TWO_COLUMN_CARD_LAYOUT;
  }

  if (statId.startsWith("discipline:")) {
    return FOUR_COLUMN_CARD_LAYOUT;
  }

  return DEFAULT_CARD_LAYOUT;
};
