const { Trait } = require(".././trait/trait.ts");

/*
cd simulators/battle-simulator/data/trait
nodemon trait-data.ts
*/

export const traits = [
  new Trait({
    name: "Watcher",
    level: 2,
    statsByLevel: {
      2: {
        description: "nothing",
        additionalArmor: 0, // percentage
      },
      4: {
        description: "nothing",
        additionalArmor: 25, // percentage
      },
      6: {
        decription: "nothing",
        additionalArmor: 35, // percentage
      },
    },
  }),
  new Trait({
    name: "Automata",
    level: 2,
    statsByLevel: {
      2: {
        description: "nothing",
        additionalArmor: 0,
        additionalMagicResist: 25,
        additionalAttackDamage: 10,
      },
      4: {
        description: "nothing",
        additionalArmor: 55,
        additionalMagicResist: 55,
      },
      6: {
        description: "nothing",
        additionalArmor: 100,
        additionalMagicResist: 100,
      },
    },
  }),
];

//traits[1].level += 2;

export function getTraitByName(name: string) {
  if (!name) {
    return null;
  }

  const trait = traits.find((trait) => trait.name === name);

  return {
    name: trait.name,
    level: trait.level,
    stats: trait.getCurrentLevelStats(),
  };
}

module.exports = { traits, getTraitByName };
