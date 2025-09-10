import { RefObject } from "react";

export interface ChampionCardHoverProps {
  champion: string;
  cost?: number;
  currentHp?: number;
  maxHp?: number;
  mana?: number;
  maxMana?: number;
  shield?: number;
  trait1?: string;
  trait2?: string;
  trait3?: string;
  item1?: string;
  item2?: string;
  item3?: string;
  armor?: number;
  magicResist?: number;
  attackDamage?: number;
  attackSpeed?: number;
  critChance?: number;
  critDamage?: number;
  abilityPower?: number;
  damageAmp?: number;
  omnivamp?: number;
  reduction?: number;
  range?: number;
  starLevel?: number;
  parentRef: RefObject<HTMLDivElement>;
}
