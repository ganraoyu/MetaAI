const BASE_MOVEMENT_SPEED = 550; 
const HEX_DISTANCE = 225; 

function getFormattedTime(battleTime) {
    const mins = Math.floor(battleTime / 6000);
    const secs = Math.floor((battleTime % 6000) / 100);
    const cents = battleTime % 100;
    
    return `${mins}:${secs.toString().padStart(2, '0')}.${cents.toString().padStart(2, '0')}`;
}

function getDistanceBetweenCells(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
}

function findClosestEnemy(champion, enemyTeam, board) {
    let closestEnemy = null;
    let shortestDistance = Infinity;
    
    const [championRow, championCol] = board.getChampionPosition(champion);
    
    enemyTeam.forEach(enemy => {
        if (enemy.currentHp > 0) {
            const [enemyRow, enemyCol] = board.getChampionPosition(enemy);
            const distance = getDistanceBetweenCells(championRow, championCol, enemyRow, enemyCol);
            
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestEnemy = enemy;
            }
        }
    });
    
    return { closestEnemy, distance: shortestDistance };
}

function moveChampionTowardsTarget(champion, target, board, battleTime) {
    const [championRow, championCol] = board.getChampionPosition(champion);
    const [targetRow, targetCol] = board.getChampionPosition(target);
    
    let newRow = championRow;
    let newCol = championCol;
    
    if (championRow < targetRow) {
        newRow = championRow + 1;
    } else if (championRow > targetRow) {
        newRow = championRow - 1;
    } else if (championCol < targetCol) {
        newCol = championCol + 1;
    } else if (championCol > targetCol) {
        newCol = championCol - 1;
    }
    
    if (board.isValidPosition(newRow, newCol) && !board.getChampion(newRow, newCol)) {

        let movementSpeed = champion.movementSpeed || BASE_MOVEMENT_SPEED;
        let moveTime = Math.round((HEX_DISTANCE / movementSpeed) * 100);

        battleTime += moveTime;
        champion.nextAttackTime += moveTime;

        const formattedTime = getFormattedTime(battleTime);
        console.log(`[${formattedTime}] ${champion.name} moves from [${championRow},${championCol}] to [${newRow},${newCol}] (delay: ${moveTime/100}s)`);

        board.removeChampion(championRow, championCol);
        board.placeChampion(champion, newRow, newCol);
        return moveTime;
    }
    
    return false;
}

module.exports = {
    getDistanceBetweenCells,
    findClosestEnemy,
    moveChampionTowardsTarget
};