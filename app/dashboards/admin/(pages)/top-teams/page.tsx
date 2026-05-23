import Link from "next/link";

import AdminFollowedCard from "@/app/dashboards/admin/(pages)/home/_components/admin-followed-card";
import { mapAdminDashboardFollowedItems } from "@/app/dashboards/admin/(pages)/home/_utils/admin.dashboard.utils";
import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import { getAdminDashboardTopTeams } from "@/service/admin/dashboard/admin.dashboard.server.service";

type TopTeamsPageProps = {
    searchParams?: Promise<{
        page?: string;
        limit?: string;
    }>;
};

const TOP_TEAMS_ROUTE = "/dashboards/admin/top-teams";
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const getPositiveNumber = (value: string | undefined, fallback: number) => {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
        return fallback;
    }

    return parsedValue;
};

export default async function TopTeamsPage({
    searchParams,
}: TopTeamsPageProps) {
    const query = searchParams ? await searchParams : {};

    const page = getPositiveNumber(query.page, DEFAULT_PAGE);
    const limit = getPositiveNumber(query.limit, DEFAULT_LIMIT);

    const teamsResponse = await getAdminDashboardTopTeams({
        page,
        limit,
    });

    const teams = mapAdminDashboardFollowedItems(teamsResponse.data.items);
    const { meta } = teamsResponse.data;

    const getPageHref = (targetPage: number) => {
        const params = new URLSearchParams({
            page: String(targetPage),
            limit: String(limit),
        });

        return `${TOP_TEAMS_ROUTE}?${params.toString()}`;
    };

    return (
        <section className="text-[#10201B] dark:text-white">
            <div className="flex items-start gap-3">
                <BackArrowButton className="mt-0.5 shrink-0" />

                <div>
                    <h1 className="text-2xl font-bold lg:text-3xl">
                        Top Followed Teams
                    </h1>
                    <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">
                        View teams ranked by follower count.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <AdminFollowedCard
                    title="Top Followed Teams"
                    items={teams}
                    showViewAll={false}
                />
            </div>

            {meta.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-end gap-3">
                    {meta.page > 1 ? (
                        <Link
                            href={getPageHref(meta.page - 1)}
                            className="cursor-pointer rounded-lg bg-[#EAF3EF] px-4 py-2 text-sm font-medium text-[#10201B] transition hover:opacity-80 dark:bg-[#25302B] dark:text-white"
                        >
                            Previous
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-lg bg-[#EAF3EF] px-4 py-2 text-sm font-medium text-[#6B7A75] dark:bg-[#25302B] dark:text-white/45"
                        >
                            Previous
                        </button>
                    )}

                    <span className="text-sm text-[#6B7A75] dark:text-white/45">
                        Page {meta.page} of {meta.totalPages}
                    </span>

                    {meta.page < meta.totalPages ? (
                        <Link
                            href={getPageHref(meta.page + 1)}
                            className="cursor-pointer rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-80"
                        >
                            Next
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white opacity-60"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}