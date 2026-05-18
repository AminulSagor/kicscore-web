import { SigninUser, SigninToken } from "@/types/auth/signin.types";

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: SigninUser;
    token: SigninToken;
  };
  timestamp: string;
  path: string;
}
