import type { TrendingFollowingItemMock } from "@/mock/user/following/following.mock.types";
import FollowingRow from "./following-row";

type TrendingListProps = {
    items: TrendingFollowingItemMock[];
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
                        type={item.type}
                        popupType={item.popupType}
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