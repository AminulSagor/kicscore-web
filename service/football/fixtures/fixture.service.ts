import serviceClient from "@/service/base/service.client";
import { LiveFixturesApiResponse } from "@/types/football/fixtures/fixture.types";

export const getLiveFixtures = async () => {
  const response = await serviceClient.get<LiveFixturesApiResponse>(
    "/football/fixtures/live",
  );

  return response.data.data;
};
