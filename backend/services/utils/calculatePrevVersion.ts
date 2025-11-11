export const calculatePrevVersion = (version: string) => { 
  const set = version.split("_")[0];
  const prevVersion = String(Number(version[-1]) - 1);

  return set + "_" + prevVersion;
};