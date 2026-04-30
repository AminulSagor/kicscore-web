import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { CoachDetailsMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachProfileHeaderProps = {
    coach: CoachDetailsMock;
};

const CoachProfileHeader = ({ coach }: CoachProfileHeaderProps) => {
    return (
        <header>
            <button className="text-[#61736D] transition hover:text-[#008A63] dark:text-white/60 dark:hover:text-[#79e2c5]">
                <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="mt-5 flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#008A63] bg-[#1F2926] text-xs font-bold text-[#79e2c5]">
                    {coach.avatar ? (
                        <Image
                            src={coach.avatar}
                            alt={coach.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        coach.name.slice(0, 1)
                    )}
                </div>

                <div>
                    <h1 className="text-lg font-bold">{coach.name}</h1>
                    <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
                        {coach.role}
                    </p>

                    <button className="mt-3 rounded-full bg-[#34D399] px-4 py-1.5 text-xs font-bold text-[#07110F] transition hover:bg-[#25C28A]">
                        Follow
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CoachProfileHeader;