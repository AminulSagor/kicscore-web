import {
    followingMockData,
    followingTabsMockData,
    trendingFollowingMockData,
} from "@/mock/user/following/following.mock.data";
import type { FollowingTabKey } from "@/mock/user/following/following.mock.types";

import FollowingList from "./_components/following-list";
import FollowingTabs from "./_components/following-tabs";
import TrendingList from "./_components/trending-list";

type FollowingPageProps = {
    searchParams?: Promise<{
        tab?: string;
    }>;
};

const isFollowingTabKey = (tab?: string): tab is FollowingTabKey => {
    return ["leagues", "players", "teams", "coach"].includes(tab ?? "");
};

export default async function FollowingPage({
    searchParams,
}: FollowingPageProps) {
    const params = searchParams ? await searchParams : {};
    const activeTab: FollowingTabKey = isFollowingTabKey(params.tab)
        ? params.tab
        : "leagues";

    const followingItems = followingMockData.filter(
        (item) => item.type === activeTab,
    );

    const trendingItems = trendingFollowingMockData.filter(
        (item) => item.type === activeTab,
    );

    return (
        <main className="min-h-screen bg-[#F8FBFA] text-[#0B1F1A] dark:bg-[#07110F] dark:text-white">
            <section className="padding-x mx-auto max-w-[920px] pt-14 pb-28">
                <h1 className="text-xl font-bold tracking-tight">Following</h1>

                <div className="mt-6">
                    <FollowingTabs tabs={followingTabsMockData} activeTab={activeTab} />
                </div>

                <FollowingList items={followingItems} />

                <TrendingList items={trendingItems} />
            </section>
        </main>
    );
}