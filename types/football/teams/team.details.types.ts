export interface TeamDetailsTeam {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface TeamDetailsVenue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface TeamDetailsItem {
  team: TeamDetailsTeam;
  venue: TeamDetailsVenue;
}

export interface TeamDetailsFollow {
  isFollowed: boolean;
  entityType: "TEAM";
  entityId: string;
}

export interface TeamDetailsData {
  get: string;
  parameters: {
    id: string;
  };
  errors: unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: TeamDetailsItem[];
  follow: TeamDetailsFollow;
}

export interface TeamDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeamDetailsData;
  timestamp: string;
  path: string;
}
