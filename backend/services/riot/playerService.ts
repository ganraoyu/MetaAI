import { fullRegionClient } from "../../utilities/riotHttpClient";
import { AxiosResponse } from "axios";
import { AccountResponse, MatchDetail } from "./types";

export const fetchPlayerPuuid = async (
  gameName: string,
  tagLine: string,
  region: string,
): Promise<string | null> => {
  const client = fullRegionClient(region);
  const response: AxiosResponse<AccountResponse> = await client.get(
    `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
  );

  const puuid = response.data.puuid;
  return puuid || null;
};

export const fetchPlayerMatches = async (
  gameName: string,
  tagLine: string,
  region: string,
): Promise<MatchDetail[]> => {
  const client = fullRegionClient(region);

  // Fetch PUUID first
  const accountResponse: AxiosResponse<AccountResponse> = await client.get(
    `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
  );
  const puuid = accountResponse.data.puuid;

  if (!puuid) return [];

  // Get match IDs
  const matchIdsResponse: AxiosResponse<string[]> = await client.get(
    `/tft/match/v1/matches/by-puuid/${puuid}/ids`,
  );
  const playerMatchIds = matchIdsResponse.data.slice(0, 10); // adjust later if needed

  // Fetch match details
  const matchDetailResponses: AxiosResponse<MatchDetail>[] = await Promise.all(
    playerMatchIds.map((matchId) => client.get(`/tft/match/v1/matches/${matchId}`)),
  );

  const playerMatchDetails = matchDetailResponses.map((res) => res.data);
  return playerMatchDetails;
};
