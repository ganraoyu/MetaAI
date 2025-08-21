import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const RIOT_API_KEY = process.env.RIOT_API_KEY;

if (!RIOT_API_KEY) {
  throw new Error('RIOT_API_KEY is not defined in environment variables');
}

export const fullRegionClient = (region: string): AxiosInstance => {
  return axios.create({
    baseURL: `https://${region}.api.riotgames.com`, // americas, europe, asia
    headers: {
      'X-Riot-Token': RIOT_API_KEY,
    },
  });
};

export const shortRegionClient = (shortRegion: string): AxiosInstance => {
  return axios.create({
    baseURL: `https://${shortRegion}.api.riotgames.com`, // na1, euw1, sg1
    headers: {
      'X-Riot-Token': RIOT_API_KEY,
    },
  });
};
