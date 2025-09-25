import getChampionData from "../utils/stats/championData";

export const updateChampionData = async () => {
  try {
    const data = await getChampionData("Challenger");
    console.log("Champion data updated successfully:", data);
  } catch (error) {
    console.error("Error updating champion data:", error);
  }
};

