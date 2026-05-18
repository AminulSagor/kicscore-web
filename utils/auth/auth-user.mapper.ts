import { AuthUser } from "@/types/auth/auth-user.types";
import { GetMeUser } from "@/types/auth/get-me.types";
import { SigninUser } from "@/types/auth/signin.types";

export const mapSigninUserToAuthUser = (user: SigninUser): AuthUser => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

export const mapGetMeUserToAuthUser = (user: GetMeUser): AuthUser => ({
  id: user.id,
  email: user.email,
  role: user.role,
  status: user.status,
  emailVerifiedAt: user.emailVerifiedAt,
  fullName: user.profile?.fullName,
  profilePhotoFileId: user.profile?.profilePhotoFileId,
  photoReadUrl: user.profile?.photoReadUrl,
});
