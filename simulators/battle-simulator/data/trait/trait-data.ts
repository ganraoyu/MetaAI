const { Trait } = require('.././trait/trait.ts');

/*
cd simulators/battle-simulator/data/trait
nodemon trait-data.ts
*/

export const traits = [
    new Trait({
        name: 'Watcher',
        level: 0,
        statsByLevel: {
            2:{
                description: 'nothing',
                additionalArmor: 10,
            },
            4:{
                description: 'nothing',
                additionalArmor: 20,
            },
            6:{
                decription: 'nothing',
                additionalArmor: 60,
            },
        }
    })
]

function getTraitByName(name: string){
    if(!name){
        return null;
    }

    const itemStats = traits.find(trait => trait.name === name);
    return {
        name: itemStats.name, 
        level: itemStats.level,
        stats: itemStats.getCurrentLevelStats()
    }
}

console.log(getTraitByName('Watcher'));

module.exports = { traits }