const battleLogs: Object[] = [];

function getFormattedTime(time: number) {
    const minutes = Math.floor(time / 6000);
    const seconds = ((time % 6000) / 100).toFixed(2).padStart(5, '0');
    return `${minutes}:${seconds}`;
}

export function logBattleEvent(eventType: string, details: object, currentTime: number) {
    const timeStamp = getFormattedTime(currentTime);

    battleLogs.push({
        formattedTime: timeStamp,
        type: eventType,
        details: details
    });
    
}

export function getBattleHistory(currentBattleTime: number) {
    return {
        battleLogs,
        duration: currentBattleTime ? currentBattleTime/100 : 0
    };
}

