export interface TeamAboutFollowContext {
  userId: string | null;
  installationId: string | null;
  entityType: "TEAM";
  entityId: string;
}

export interface TeamAboutData {
  teamId: string;
  about: string;
  followContext: TeamAboutFollowContext;
}

export interface TeamAboutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeamAboutData;
  timestamp: string;
  path: string;
}
