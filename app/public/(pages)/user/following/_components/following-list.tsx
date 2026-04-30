import type { FollowingItemMock } from "@/mock/user/following/following.mock.types";
import FollowingRow from "./following-row";

type FollowingListProps = {
    items: FollowingItemMock[];
};

const FollowingList = ({ items }: FollowingListProps) => {
    return (
        <section className="mt-8">
            <h2 className="text-sm font-bold">Following</h2>

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
                    />
                ))}
            </div>
        </section>
    );
};

export default FollowingList;