import { Trait } from "../types";

export const traitsSET13: Trait[] = [
  {
    name: "Watcher",
    image: "../assets/SET13/traits/Watcher.png",
    description: "Watcher champions gain bonus health.",
    tiers: [
      {
        count: 1,
        tierLabel: "Bronze",
        effect: "Watchers gain 100 bonus health.",
        stats: { health: 100 },
      },
      {
        count: 3,
        tierLabel: "Silver",
        effect: "Watchers gain 250 bonus health.",
        stats: { health: 250 },
      },
      {
        count: 5,
        tierLabel: "Gold",
        effect: "Watchers gain 450 bonus health.",
        stats: { health: 450 },
      },
      {
        count: 7,
        tierLabel: "Prismatic",
        effect: "Watchers gain 700 bonus health.",
        stats: { health: 700 },
      },
    ],
  },
  {
    name: "Automata",
    image: "../assets/SET13/traits/Automaton.png",
    description: "Automaton champions gain bonus attack damage and armor.",
    tiers: [
      {
        count: 3,
        tierLabel: "Bronze",
        effect: "Automatons gain 10 bonus attack damage and 15 armor.",
        stats: { attackDamage: 10, armor: 15 },
      },
      {
        count: 4,
        tierLabel: "Silver",
        effect: "Automatons gain 25 bonus attack damage and 35 armor.",
        stats: { attackDamage: 25, armor: 35 },
      },
      {
        count: 5,
        tierLabel: "Gold",
        effect: "Automatons gain 40 bonus attack damage and 60 armor.",
        stats: { attackDamage: 40, armor: 60 },
      },
      {
        count: 7,
        tierLabel: "Prismatic",
        effect: "Automatons gain 60 bonus attack damage and 90 armor.",
        stats: { attackDamage: 60, armor: 90 },
      },
    ],
  },
  {
    name: "Conqueror",
    image: "../assets/SET13/traits/Conqueror.png",
    description: "Conqueror champions gain bonus health.",
    tiers: [
      {
        count: 2,
        tierLabel: "Bronze",
        effect: "Conquerors gain 100 bonus health.",
        stats: { health: 100 },
      },
      {
        count: 3,
        tierLabel: "Silver",
        effect: "Conquerors gain 250 bonus health.",
        stats: { health: 250 },
      },
      {
        count: 5,
        tierLabel: "Gold",
        effect: "Conquerors gain 450 bonus health.",
        stats: { health: 450 },
      },
      {
        count: 7,
        tierLabel: "Prismatic",
        effect: "Conquerors gain 700 bonus health.",
        stats: { health: 700 },
      },
    ],
  },
  {
    name: "Rebel",
    image: "../assets/SET13/traits/Rebel.png",
    description: "Rebel champions gain mana regeneration and spell power.",
    tiers: [
      {
        count: 1,
        tierLabel: "Bronze",
        effect: "Rebels gain 2 mana regeneration and 10 spell power.",
        stats: { manaRegen: 2, spellPower: 10 },
      },
      {
        count: 3,
        tierLabel: "Silver",
        effect: "Rebels gain 5 mana regeneration and 25 spell power.",
        stats: { manaRegen: 5, spellPower: 25 },
      },
      {
        count: 5,
        tierLabel: "Gold",
        effect: "Rebels gain 9 mana regeneration and 50 spell power.",
        stats: { manaRegen: 9, spellPower: 50 },
      },
      {
        count: 7,
        tierLabel: "Prismatic",
        effect: "Rebels gain 15 mana regeneration and 80 spell power.",
        stats: { manaRegen: 15, spellPower: 80 },
      },
    ],
  },
];
