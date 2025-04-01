import { Champion } from '../../champion/champion';
import {
    dragonsClawEffect, 
    brambleVestEffect, 
    bloodthristerEffect, 
    archangelsStaffEffect, 
    giantSlayerEffect, 
    steraksGageEffect, 
    runnansHurricaneEffect,
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
} from './combinedItems'

export function applyStaticEffects(champion: Champion) {
    runnansHurricaneEffect(champion);
    steraksGageEffect(champion);
    handOfJusticeEffect(champion);
    steadfastHeartEffect(champion);
}

export function applySimpleEffects(champion: Champion, battleTime: number){
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
};

export function applyTargetEffects(champion: Champion, target: Champion, battleTime: number) {
    brambleVestEffect(champion, target, battleTime);
    giantSlayerEffect(champion, target, battleTime);
    guardBreakerEffect(champion, target, battleTime);
    redBuffEffect(champion, target, battleTime);
    morellonomiconEffect(champion, target, battleTime);
    statikkShivEffect(champion, target, battleTime);
}

export function applyAllyEffects(champion: Champion, ally: Champion, battleTime: number) {
    hextechGunbladeEffect(champion, ally, battleTime);
}

export function applySurroundingOpponentsEffects(champion: Champion, surroundingOpponents: Champion[], battleTime: number) {
    evenshroudEffect(champion, surroundingOpponents, battleTime);
}

export function applySurroundingAlliesEffects(champion: Champion, surroundingAllies: Champion[], battleTime: number) {
    redemptionEffect(champion, surroundingAllies, battleTime);
}

export function applyTargetAreaEffects(champion: Champion, target: Champion, surroundingOpponents: Champion[], battleTime: number) {
    ionicSparkEffect(champion, target, surroundingOpponents, battleTime);
    sunfireCapeEffect(champion, target, surroundingOpponents, battleTime);
}

export function applyPositionalEffects(champion: Champion, isChampionFrontOrBack: boolean, battleTime: number) {
    adaptiveHelmEffect(champion, isChampionFrontOrBack, battleTime);
}

export function applyAllItemEffects(
    champion: Champion, 
    battleTime: number, 
    target: Champion, 
    ally: Champion, 
    isChampionFrontOrBack: boolean, 
    surroundingAllies: Champion[],
    surroundOpponents: Champion[] 
){
    applyStaticEffects(champion);
    applySimpleEffects(champion, battleTime);

    if(target){
        applyTargetEffects(champion, target, battleTime);
    }

    if(ally){
        applyAllyEffects(champion, ally, battleTime);
    }

    if(surroundingAllies.length > 0){
        applySurroundingAlliesEffects(champion, surroundingAllies, battleTime);
    }

    if(surroundOpponents.length > 0){
        applySurroundingOpponentsEffects(champion, surroundOpponents, battleTime);
    }

    if(target && surroundOpponents.length > 0){
        applyTargetAreaEffects(champion, target, surroundOpponents, battleTime);
    }

    applyPositionalEffects(champion, isChampionFrontOrBack, battleTime);
}   



