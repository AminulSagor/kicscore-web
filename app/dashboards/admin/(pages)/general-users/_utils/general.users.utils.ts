import type {
    AdminGeneralUserItem,
    GeneralUserTableItem,
} from "@/types/admin/general-users/general.users.types";

const formatJoinedDate = (dateValue: string) => {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const getUserName = (user: AdminGeneralUserItem) => {
    const fullName = user.profile?.fullName?.trim();

    if (fullName) {
        return fullName;
    }

    return user.email.split("@")[0];
};

const getAvatarInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
};

export const mapGeneralUsers = (
    users: AdminGeneralUserItem[],
): GeneralUserTableItem[] => {
    return users.map((user) => {
        const name = getUserName(user);

        return {
            id: user.id,
            name,
            avatarInitial: getAvatarInitial(name),
            email: user.email,
            status: user.status === "ACTIVE" ? "active" : "blocked",
            joinedDate: formatJoinedDate(user.createdAt),
        };
    });
};