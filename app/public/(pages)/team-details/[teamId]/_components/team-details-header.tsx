import Image from "next/image";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";

import TeamFollowButton from "./team-follow-button";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  teamId: string;
  teamName: string;
  country: string;
  logo?: string | null;
  initialIsFollowing?: boolean;
};

export default function TeamDetailsHeader({
  teamId,
  teamName,
  country,
  logo,
  initialIsFollowing = false,
}: Props) {
  const teamLogo = getValidImage(logo);

  return (
    <div>
      <BackArrowButton />

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-secondary bg-[#F3F7F5] dark:bg-primary">
          <Image
            src={teamLogo}
            alt={`${teamName} logo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-[#10201B] dark:text-white">
            {teamName}
          </h1>

          <p className="text-sm text-[#6B7A75] dark:text-white/60">{country}</p>

          <div className="mt-3">
            <TeamFollowButton
              teamId={teamId}
              teamName={teamName}
              logo={teamLogo}
              initialIsFollowing={initialIsFollowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
