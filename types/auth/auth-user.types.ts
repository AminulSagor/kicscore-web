export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  status?: "ACTIVE" | "INACTIVE";
  emailVerifiedAt?: string | null;
  fullName?: string;
  profilePhotoFileId?: string | null;
  photoReadUrl?: string | null;
}
