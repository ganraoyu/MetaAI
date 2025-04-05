const battleLogs = [];

function getFormattedTime(time) {
    const minutes = Math.floor(time / 6000);
    const seconds = ((time % 6000) / 100).toFixed(2).padStart(5, '0');
    return `${minutes}:${seconds}`;
}

function logBattleEvent(eventType, details, currentTime) {
    const timeStamp = getFormattedTime(currentTime);

    battleLogs.push({
        formattedTime: timeStamp,
        type: eventType,
        details: details
    });
    
}

function getBattleHistory(currentBattleTime) {
    return {
        battleLogs,
        duration: currentBattleTime ? currentBattleTime/100 : 0
    };
}

module.exports = {
    logBattleEvent,
    getBattleHistory,
    battleLogs
}