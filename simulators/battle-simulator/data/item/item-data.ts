const { Item } = require('.././item/item.ts');

/*
cd simulators/battle-simulator/data/item
npx nodemon --exec ts-node item-data.ts

*/

const items = [
    new Item({
    name:'B.F. Sword',
    description: 'nothing',
    additionalAttackDamage: 1.1,
    }), 
    new Item({
        name:'Recurve Bow',
        description:'nothing',
        additionalAttackSpeed: 1.1,
    })
]

function getItemByName(name: string){
    if(!name){
        return 'Champion name cannt be Empty'
    }

    const item = items.find(item => item.name === name)

    if(!item){
        return 'Item not found'
    }
    return item
}

console.log(getItemByName('B.F. Sword'))

