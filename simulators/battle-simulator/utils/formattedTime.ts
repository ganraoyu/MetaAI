import { Champion } from "../data/champion/champion";

export function getFormattedTime(champion: any) {
  const mins = Math.floor(champion.battleTime / 6000);
  const secs = Math.floor((champion.battleTime % 6000) / 100);
  const cents = champion.battleTime % 100;
  const formattedTime = `${mins}:${secs.toString().padStart(2, "0")}:${cents.toString().padStart(2, "0")}`;

  return formattedTime;
}
