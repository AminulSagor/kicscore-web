import type { TrendingFollowingItemMock } from "@/mock/user/following/following.mock.types";
import type { FollowEntityType } from "@/types/follows/follow.types";

import FollowingRow from "./following-row";

type TrendingListProps = {
    items: TrendingFollowingItemMock[];
};

const getFollowEntityType = (
    type: TrendingFollowingItemMock["type"],
): FollowEntityType => {
    const entityTypeMap: Record<
        TrendingFollowingItemMock["type"],
        FollowEntityType
    > = {
        players: "PLAYER",
        teams: "TEAM",
        coach: "COACH",
        leagues: "LEAGUE",
    };

    return entityTypeMap[type];
};

const TrendingList = ({ items }: TrendingListProps) => {
    return (
        <section className="mt-8">
            <h2 className="text-sm font-bold">Trending</h2>

            <div className="mt-5 space-y-3">
                {items.map((item) => (
                    <FollowingRow
                        key={item.id}
                        name={item.name}
                        entityType={getFollowEntityType(item.type)}
                        entityId={item.id}
                        iconLabel={item.iconLabel}
                        subtitle={item.subtitle}
                        image={item.image}
                        showFollowButton
                    />
                ))}
            </div>
        </section>
    );
};

export default TrendingList;