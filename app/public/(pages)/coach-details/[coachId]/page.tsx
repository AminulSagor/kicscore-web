import { notFound } from "next/navigation";
import { coachDetailsMockData } from "@/mock/coach-details/coach-details.mock.data";

import CoachCareer from "./_components/coach-career";
import CoachProfileHeader from "./_components/coach-profile-header";
import CoachProfileOverview from "./_components/coach-profile-overview";
import CoachTrophies from "./_components/coach-trophies";

type CoachDetailsPageProps = {
  params: Promise<{
    coachId: string;
  }>;
};

export default async function CoachDetailsPage({
  params,
}: CoachDetailsPageProps) {
  const { coachId } = await params;
  const coach = coachDetailsMockData.find((item) => item.id === coachId);

  if (!coach) notFound();

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

          <CoachTrophies trophies={coach.trophies} />

          <CoachCareer career={coach.career} />
        </div>
      </section>
    </main>
  );
}
