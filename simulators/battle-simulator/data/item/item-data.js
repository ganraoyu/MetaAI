const { Item } = require('.././item/item.js');

/*
cd simulators/battle-simulator/data/item
nodemon item-data.js
*/

const items = [
    new Item({
    name:'B.F. Sword',
    description: 'Lotom',
    additionalAttackDamage: 1.1,
    })
]

function getItemByName(name){
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

