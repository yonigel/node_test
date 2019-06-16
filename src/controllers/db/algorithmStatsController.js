const IsItemSimilarSchema = require('../../models/isItemSimilar');

const getRightPercentage = async (req, res) => {

    const itemDetails = await IsItemSimilarSchema.find().exec();

    console.log(`found total ${itemDetails.length}`)

    const rightResults = itemDetails.filter((item) => item.isSimilar === true)
    // 
    res.send({percentage: (rightResults.length/itemDetails.length)*100});

}

const dbController = {
    getRightPercentage
}

module.exports = dbController;