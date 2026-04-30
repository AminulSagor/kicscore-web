export type FollowingTabKey = "leagues" | "players" | "teams" | "coach";
export type FollowingPopupType =
    | "league"
    | "player"
    | "team"
    | "team-vs-team"
    | "coach";

export type FollowingItemMock = {
    id: string;
    name: string;
    type: FollowingTabKey;
    popupType?: FollowingPopupType;
    iconLabel: string;
    subtitle?: string;
    image?: string;
};

export type TrendingFollowingItemMock = FollowingItemMock & {
    isFollowing: boolean;
};