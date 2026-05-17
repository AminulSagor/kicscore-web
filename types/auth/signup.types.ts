export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    email: string;
    requiresVerification: boolean;
  };
  timestamp: string;
  path: string;
}
