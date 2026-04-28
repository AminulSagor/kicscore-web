export type GeneralUserStatusMock = "active" | "blocked";

export type GeneralUserMock = {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: GeneralUserStatusMock;
  avatar: string;
};
