import { RefreshCcw } from "lucide-react";

import Card from "@/components/UI/cards/card";
import { MatchDetailsItem } from "@/types/football/matches/match.details.types";

import {
  buildMatchFactEvents,
  MatchFactEventType,
  MatchFactEventView,
} from "@/app/public/(pages)/match-details/_utils/match.facts.utils";

interface MatchEventsProps {
  match: MatchDetailsItem;
}

export default function MatchEvents({ match }: MatchEventsProps) {
  const matchEvents = buildMatchFactEvents(match);

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Events</h3>
      </div>

      <div className="mx-auto max-w-[980px] px-5 py-10 sm:px-8 md:px-12">
        {matchEvents.length ? (
          matchEvents.map((event) => (
            <MatchEventRow key={event.id} event={event} />
          ))
        ) : (
          <p className="text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Events are not available yet.
          </p>
        )}
      </div>
    </Card>
  );
}

function MatchEventRow({ event }: { event: MatchFactEventView }) {
  if (event.type === "period") {
    return <PeriodEvent title={event.title} />;
  }

  if (!event.side) return null;

  const isHome = event.side === "home";

  return (
    <div className="grid grid-cols-1 items-center py-5 md:grid-cols-2">
      <div className={isHome ? "flex justify-start" : "hidden md:block"}>
        {isHome && <EventContent event={event} align="left" />}
      </div>

      <div className={!isHome ? "flex justify-end" : "hidden md:block"}>
        {!isHome && <EventContent event={event} align="right" />}
      </div>

      <div className="flex md:hidden">
        <EventContent event={event} align="left" />
      </div>
    </div>
  );
}

function EventContent({
  event,
  align,
}: {
  event: MatchFactEventView;
  align: "left" | "right";
}) {
  const isRight = align === "right";

  if (isRight) {
    return (
      <div className="flex items-center gap-4">
        <EventText event={event} align="right" />
        <EventIcon type={event.type} />
        <MinuteBadge minute={event.minute} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <MinuteBadge minute={event.minute} />
      <EventIcon type={event.type} />
      <EventText event={event} align="left" />
    </div>
  );
}

function EventText({
  event,
  align,
}: {
  event: MatchFactEventView;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <h4 className="text-sm font-bold text-[#10201B] dark:text-white">
        {event.title ?? "Match event"}{" "}
        {event.score && (
          <span className="text-mint-green">({event.score})</span>
        )}
      </h4>

      {event.subtitle && (
        <p className="mt-1 text-xs font-medium text-[#6B7A75] dark:text-white/45">
          {event.subtitle}
        </p>
      )}

      {event.secondaryTitle && (
        <p className="mt-1 text-xs font-bold text-red">
          {event.secondaryTitle}
        </p>
      )}
    </div>
  );
}

function EventIcon({ type }: { type: MatchFactEventType }) {
  if (type === "substitution") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-black text-mint-green">
        <RefreshCcw className="size-4" />
      </span>
    );
  }

  if (type === "yellow-card") {
    return <span className="h-7 w-4 rounded-sm bg-yellow-400" />;
  }

  if (type === "red-card") {
    return <span className="h-7 w-4 rounded-sm bg-red" />;
  }

  if (type === "var") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
        VAR
      </span>
    );
  }

  if (type === "goal") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-[#2C3834]">
        <span className="size-3 rounded-full bg-white" />
      </span>
    );
  }

  return <span className="size-3 rounded-full bg-[#DDE8E3] dark:bg-white/20" />;
}

function MinuteBadge({ minute }: { minute?: string }) {
  if (!minute) return null;

  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
      {minute}
    </span>
  );
}

function PeriodEvent({ title }: { title?: string }) {
  return (
    <div className="mx-auto flex w-full items-center gap-5 py-10">
      <div className="h-px flex-1 bg-[#DDE8E3] dark:bg-white/10" />

      <span className="shrink-0 text-sm font-bold text-[#6B7A75] dark:text-white/55">
        {title}
      </span>

      <div className="h-px flex-1 bg-[#DDE8E3] dark:bg-white/10" />
    </div>
  );
}
