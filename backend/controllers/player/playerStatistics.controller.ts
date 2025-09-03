import { Request, Response, RequestHandler } from "express";
import { fetchPlayerMatches, fetchPlayerPuuid } from "../../utils/playerUtils";

interface Trait {
  name: string;
  num_units: number;
}
interface Participant {
  puuid: string;
  traits: Trait[];
  placement?: number;
}
interface MatchInfo {
  participants: Participant[];
}
interface Match {
  info: MatchInfo;
}

// Use RequestHandler type
const getPlayerWinRate: RequestHandler = async (req, res) => {
  const { gameName, tagLine, region } = req.params;

  try {
    const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region);

    if (!playerMatchDetails.length) {
      res.status(404).send("No matches found for this player.");
      return;
    }

    const puuid = await fetchPlayerPuuid(gameName, tagLine, region);

    let totalGames = 0;
    let wins = 0;
    let placements: number[] = [];
    let totalPlacement = 0;

    playerMatchDetails.forEach((match) => {
      if (!match.info || !match.info.participants) return;

      match.info.participants.forEach((participant: Participant) => {
        if (participant.puuid !== puuid) return;
        totalGames++;
        if (participant.placement === 1) wins++;
        placements.push(participant.placement!);
        totalPlacement += participant.placement!;
      });
    });

    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
    const placementRate = totalGames > 0 ? totalPlacement / totalGames : 0;

    res.json({ totalGames, wins, winRate, placementRate, placements });
  } catch (error: any) {
    console.error("Error fetching player winrate:", error.response?.data || error.message);
    res.status(500).send("Error connecting to Riot API");
  }
};

const getPlayerMostPlayedTraits: RequestHandler = async (req, res) => {
  const { gameName, tagLine, region } = req.params;
  try {
    const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region);
    const puuid = await fetchPlayerPuuid(gameName, tagLine, region);

    const traits: Trait[] = [];

    playerMatchDetails.forEach((match) => {
      if (!match.info || !match.info.participants) return;

      match.info.participants.forEach((participant: Participant) => {
        if (participant.puuid !== puuid) return;

        participant.traits.forEach((trait) => {
          const existingTrait = traits.find((t) => t.name === trait.name);
          if (existingTrait) existingTrait.num_units += trait.num_units;
          else traits.push({ ...trait });
        });
      });
    });

    const sortedTraits = traits.sort((a, b) => b.num_units - a.num_units);
    res.json({ sortedTraits });
  } catch (error: any) {
    console.error("Error fetching data:", error.response?.data || error.message);
    res.status(500).send("Error connecting to Riot API");
  }
};

const getPlayerMostPlayedAugments: RequestHandler = async (req, res) => {
  try {
    // TODO: implement
  } catch (error: any) {
    console.error("Error fetching data:", error.response?.data || error.message);
    res.status(500).send("Error connecting to Riot API");
  }
};

export { getPlayerWinRate, getPlayerMostPlayedTraits, getPlayerMostPlayedAugments };
