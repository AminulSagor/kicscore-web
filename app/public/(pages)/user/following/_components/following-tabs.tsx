import Link from "next/link";
import type { FollowingTabKey } from "@/mock/user/following/following.mock.types";

type FollowingTabsProps = {
    tabs: {
        label: string;
        value: FollowingTabKey;
    }[];
    activeTab: FollowingTabKey;
};

const FollowingTabs = ({ tabs, activeTab }: FollowingTabsProps) => {
    return (
        <div className="flex items-center gap-6 border-b border-[#D8E7DF] dark:border-white/8">
            {tabs.map((tab) => {
                const isActive = tab.value === activeTab;

                return (
                    <Link
                        key={tab.value}
                        href={`/public/user/following?tab=${tab.value}`}
                        className={`pb-3 text-xs font-medium transition ${isActive
                                ? "border-b-2 border-[#00C48C] text-[#008A63] dark:text-[#79e2c5]"
                                : "text-[#61736D] hover:text-[#008A63] dark:text-white/50 dark:hover:text-[#79e2c5]"
                            }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default FollowingTabs;