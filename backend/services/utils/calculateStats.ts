export const sumRankStats = (rankStatsList: any[]) => {
  return rankStatsList.reduce(
    (acc, stats) => {
      if (!stats) return acc;

      acc.wins += stats.wins ?? 0;
      acc.totalGames += stats.totalGames ?? 0;
      acc.totalPlacement += (stats.averagePlacement ?? 0) * (stats.totalGames ?? 0);
      acc.placementArray.push(...(stats.placementArray ?? []));

      return acc;
    },
    {
      wins: 0,
      totalGames: 0,
      totalPlacement: 0,
      placementArray: [],
    }
  );
};

export const calculateWinrate = (wins: number, totalGames: number) =>
  totalGames ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

export const calculateAveragePlacement = (totalPlacement: number, totalGames: number) =>
  totalGames ? Number((totalPlacement / totalGames).toFixed(2)) : 0;

export const calculateTop4Rate = (placementArray: number[], totalGames: number) =>
  totalGames
    ? Number((placementArray.filter((placement) => placement <= 4).length / totalGames * 100).toFixed(2))
    : 0;

export const calculatePlayRate = (totalGames: number, globalTotalGames: number) =>
  globalTotalGames ? Number(((totalGames / globalTotalGames) * 100).toFixed(2)) : 0;
