import { Champion } from "../../champion/champion";
import {
  dragonsClawEffect,
  brambleVestEffect,
  bloodthristerEffect,
  archangelsStaffEffect,
  giantSlayerEffect,
  steraksGageEffect,
  runaansHurricaneEffect,
  titansResolveEffect,
  steadfastHeartEffect,
  crownguardEffect,
  handOfJusticeEffect,
  guardBreakerEffect,
  nashorsToothEffect,
  hextechGunbladeEffect,
  protectorsVowEffect,
  redBuffEffect,
  morellonomiconEffect,
  gargoyleStoneplateEffect,
  sunfireCapeEffect,
  ionicSparkEffect,
  adaptiveHelmEffect,
  evenshroudEffect,
  redemptionEffect,
  edgeOfNightEffect,
  quickSilverEffect,
  statikkShivEffect,
  lastWhisperEffect,
  blueBuffEffect,
} from "./combinedItems";
import {
  dragonsWillEffect,
  blessedBloodthirsterEffect,
  rosethornVestEffect,
  demonSlayerEffect,
  urlAngelsStaffEffect,
  steraksMegashieldEffect,
  titansVowEffect,
  royalCrownshieldEffect,
  fistOfFairnessEffect,
  willbreakerEffect,
  theBaronsGiftEffect,
  radiantHextechGunbladeEffect,
  bulwarksOathEffect,
  crestOfCindersEffect,
  moreMorellonomiconEffect,
  dvarapalaStoneplateEffect,
  sunlightCapeEffect,
  jakshoTheProteanEffect,
  covalentSparkEffect,
} from "./radiantItems";

export function applyStaticEffects(champion: Champion) {
  runaansHurricaneEffect(champion);
}

export function applySimpleEffects(champion: Champion, battleTime: number) {
  // combined items
  steraksGageEffect(champion, battleTime);
  steadfastHeartEffect(champion, battleTime);
  dragonsClawEffect(champion, battleTime);
  bloodthristerEffect(champion, battleTime);
  archangelsStaffEffect(champion, battleTime);
  titansResolveEffect(champion, battleTime);
  crownguardEffect(champion, battleTime);
  nashorsToothEffect(champion, battleTime);
  protectorsVowEffect(champion, battleTime);
  gargoyleStoneplateEffect(champion, battleTime);
  edgeOfNightEffect(champion, battleTime);
  quickSilverEffect(champion, battleTime);
  handOfJusticeEffect(champion, battleTime);
  blueBuffEffect(champion, battleTime);

  // radiant items
  dragonsWillEffect(champion, battleTime);
  blessedBloodthirsterEffect(champion, battleTime);
  urlAngelsStaffEffect(champion, battleTime);
  steraksMegashieldEffect(champion, battleTime);
  titansVowEffect(champion, battleTime);
  royalCrownshieldEffect(champion, battleTime);
  fistOfFairnessEffect(champion, battleTime);
  theBaronsGiftEffect(champion, battleTime);
  bulwarksOathEffect(champion, battleTime);
  dvarapalaStoneplateEffect(champion, battleTime);
}

export function applyTargetEffects(
  champion: Champion,
  target: Champion,
  battleTime: number
) {
  // combined items
  giantSlayerEffect(champion, target, battleTime);
  guardBreakerEffect(champion, target, battleTime);
  redBuffEffect(champion, target, battleTime);
  morellonomiconEffect(champion, target, battleTime);
  statikkShivEffect(champion, target, battleTime);
  lastWhisperEffect(champion, target, battleTime);

  // radiant items
  demonSlayerEffect(champion, target, battleTime);
  willbreakerEffect(champion, target, battleTime);
  crestOfCindersEffect(champion, target, battleTime);
  moreMorellonomiconEffect(champion, target, battleTime);
}

export function applyAllyEffects(
  champion: Champion,
  ally: Champion,
  battleTime: number
) {
  hextechGunbladeEffect(champion, ally, battleTime);

  radiantHextechGunbladeEffect(champion, ally, battleTime);
}

export function applySurroundingOpponentsEffects(
  champion: Champion,
  surroundingOpponents: Champion[],
  battleTime: number
) {
  // combined items
  evenshroudEffect(champion, surroundingOpponents, battleTime);
  brambleVestEffect(champion, surroundingOpponents, battleTime);

  // radiant items
  rosethornVestEffect(champion, surroundingOpponents, battleTime);
}

export function applySurroundingAlliesEffects(
  champion: Champion,
  surroundingAllies: Champion[],
  battleTime: number
) {
  redemptionEffect(champion, surroundingAllies, battleTime);
}

export function applyTargetAreaEffects(
  champion: Champion,
  target: Champion,
  surroundingOpponents: Champion[],
  battleTime: number
) {
  ionicSparkEffect(champion, target, surroundingOpponents, battleTime);
  sunfireCapeEffect(champion, target, surroundingOpponents, battleTime);

  covalentSparkEffect(champion, target, surroundingOpponents, battleTime);
  sunlightCapeEffect(champion, target, surroundingOpponents, battleTime);
}

export function applyPositionalEffects(
  champion: Champion,
  isChampionFrontOrBack: boolean,
  battleTime: number
) {
  adaptiveHelmEffect(champion, isChampionFrontOrBack, battleTime);
  jakshoTheProteanEffect(champion, isChampionFrontOrBack, battleTime);
}

export function applyAllItemEffects(
  champion: Champion,
  battleTime: number,
  target: Champion,
  ally: Champion,
  isChampionFrontOrBack: boolean,
  surroundingAllies: Champion[],
  surroundOpponents: Champion[],
  championsInRadius: Champion[],
  championsInRadiusByTarget: Champion[]
) {
  applyStaticEffects(champion);
  applySimpleEffects(champion, battleTime);

  if (target) {
    applyTargetEffects(champion, target, battleTime);
  }

  if (ally) {
    applyAllyEffects(champion, ally, battleTime);
  }

  if (surroundingAllies.length > 0) {
    applySurroundingAlliesEffects(champion, surroundingAllies, battleTime);
  }

  if (surroundOpponents.length > 0) {
    applySurroundingOpponentsEffects(champion, surroundOpponents, battleTime);
  }

  if (target && surroundOpponents.length > 0) {
    applyTargetAreaEffects(champion, target, surroundOpponents, battleTime);
  }

  applyPositionalEffects(champion, isChampionFrontOrBack, battleTime);
}
