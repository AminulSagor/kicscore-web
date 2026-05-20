import FollowingRow from "./following-row";
import { FollowEntityType, FollowItem } from "@/types/follows/follow.types";

type FollowingListProps = {
    items: FollowItem[];
    isLoading: boolean;
    onUnfollowSuccess: (entityType: FollowEntityType, entityId: string) => void;
};

const FollowingList = ({
    items,
    isLoading,
    onUnfollowSuccess,
}: FollowingListProps) => {
    return (
        <section className="mt-8">
            <h2 className="text-sm font-bold">Following</h2>

            <div className="mt-5 space-y-3">
                {isLoading && (
                    <p className="text-xs text-[#61736D] dark:text-white/45">
                        Loading follows...
                    </p>
                )}

                {!isLoading && items.length === 0 && (
                    <p className="text-xs text-[#61736D] dark:text-white/45">
                        No followed items found.
                    </p>
                )}

                {items.map((item) => (
                    <FollowingRow
                        key={item.id}
                        name={item.entitySnapshot.entityName}
                        entityType={item.entityType}
                        entityId={item.entityId}
                        iconLabel={item.entitySnapshot.entityName}
                        image={item.entitySnapshot.entityLogo || undefined}
                        onUnfollowSuccess={onUnfollowSuccess}
                    />
                ))}
            </div>
        </section>
    );
};

export default FollowingList;