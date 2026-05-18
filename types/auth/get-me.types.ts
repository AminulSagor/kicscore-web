export interface GetMeProfile {
  fullName: string;
  profilePhotoFileId: string | null;
  photoReadUrl: string | null;
}

export interface GetMeUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  emailVerifiedAt: string | null;
  profile: GetMeProfile | null;
}

export interface GetMeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GetMeUser;
  timestamp: string;
  path: string;
}
