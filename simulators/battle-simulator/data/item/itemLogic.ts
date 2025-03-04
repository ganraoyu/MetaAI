import { ItemProps } from './item'; 

export function addAdditionalItemStatistics(champion: any) {
    if(champion.items.length > 0 && champion.items.length <= 3){
        champion.items.forEach((item: ItemProps) => {            
            champion.currentHp += item.additionalHealth || 0;      
            champion.statsByStarLevel[champion.starLevel].hp += item.additionalHealth || 0;    
            champion.currentHp *= item.additionalPercentageHealth || 1; 
            champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;
            champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;           
            champion.statsByStarLevel[champion.starLevel].armor += item.additionalArmor || 0;   
            champion.statsByStarLevel[champion.starLevel].magicResist += item.additionalMagicResist || 0;
            champion.statsByStarLevel[champion.starLevel].attackDamage += item.additionalAttackDamage || 0;
            champion.attackSpeed *= item.additionalAttackSpeed || 1;
            champion.manaPerAttack += item.additionalManaPerAttack || 0;
            champion.range += item.additionalAttackRange || 0;

            champion.attackCritChance += item.additionalCritChance || 0;
            champion.attackCritDamage += item.additionalCritDamage || 0;
            champion.durability += item.additionalDurability || 0;
            champion.abilityPower += item.additionalAbilityPower || 0;            
            champion.mana += item.additionalStartingMana || 0;  
            champion.abilityManaCost -= item.reducedMaxMana || 0;
        });
        
    } else if(champion.items.length === 0){
        console.log('No items equipped');
    } else {
        console.log('Max 3 items can be equipped');
    }
}

export { addAdditionalItemStatistics as addAddtionalItemStatistics };