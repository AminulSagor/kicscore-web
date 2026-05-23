import { notFound } from "next/navigation";

import {
  getCoachCurrentRecord,
  getCoachDetails,
  getCoachTrophies,
} from "@/service/football/coaches/coach.service";

import CoachCareer from "./_components/coach-career";
import CoachProfileHeader from "./_components/coach-profile-header";
import CoachProfileOverview from "./_components/coach-profile-overview";
import CoachTrophies from "./_components/coach-trophies";
import {
  getCoachRecordQueryParams,
  mapCoachDetails,
} from "./_utils/coach-details.utils";

type CoachDetailsPageProps = {
  params: Promise<{
    coachId: string;
  }>;
  searchParams?: Promise<{
    trophyPage?: string;
    trophyLimit?: string;
  }>;
};

const getPositiveNumber = (value: string | undefined, fallback: number) => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
};

export default async function CoachDetailsPage({
  params,
  searchParams,
}: CoachDetailsPageProps) {
  const { coachId } = await params;
  const query = searchParams ? await searchParams : {};

  const trophyPage = getPositiveNumber(query.trophyPage, 1);
  const trophyLimit = getPositiveNumber(query.trophyLimit, 20);

  const [coachResponse, trophiesResponse] = await Promise.all([
    getCoachDetails({ coachId }),
    getCoachTrophies({
      coachId,
      page: trophyPage,
      limit: trophyLimit,
    }),
  ]);

  const coachEntry = coachResponse.data.response[0];

  if (!coachEntry) notFound();

  const recordQueryParams = getCoachRecordQueryParams(coachEntry);

  const recordResponse = recordQueryParams
    ? await getCoachCurrentRecord({
      coachId,
      ...recordQueryParams,
    })
    : null;

  const coach = mapCoachDetails({
    coach: coachEntry,
    follow: coachResponse.data.follow,
    trophies: trophiesResponse.data.response,
    record: recordResponse?.data.record,
  });

  return (
    <main className="">
      <section className="pt-12 pb-28">
        <div className="">
          <CoachProfileHeader coach={coach} />

          <div className="mt-12 border-b border-white/8">
            <p className="w-fit border-b-2 border-[#34D399] pb-4 text-base font-semibold">
              Profile
            </p>
          </div>

          <CoachProfileOverview coach={coach} />

          <CoachTrophies
            coachId={coach.id}
            trophies={coach.trophies}
            pagination={trophiesResponse.data.backendPaging}
          />

          <CoachCareer career={coach.career} />
        </div>
      </section>
    </main>
  );
}