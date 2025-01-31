const itemsClient = require('../../../utils/statisticsUtils/itemsUtils');

const getAboveMasterItemsData = async (req, res) => {
    const { rank } = req.params

    try{
        console.log(rank)
        const getItemsRanking = await itemsClient(rank)
        res.json(getItemsRanking)
    } catch (error){
        console.log(error)
    }
}

module.exports = { getAboveMasterItemsData }