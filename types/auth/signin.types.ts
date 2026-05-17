export interface SigninPayload {
  email: string;
  password: string;
}

export interface SigninUser {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "USER";
}

export interface SigninToken {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
}

export interface SigninResponse {
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
