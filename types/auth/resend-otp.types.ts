export interface ResendOtpPayload {
  email: string;
}

export interface ResendOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}
