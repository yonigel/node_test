const IsItemSimilarSchema = require('../../models/isItemSimilar');

const setItemSimilarity = async (req, res) => {

    const isItemSimilar = new IsItemSimilarSchema(
        {
            itemId: req.body.itemId,
            itemStore: req.body.itemStore,
            isSimilar: req.body.isSimilar
        }
    );

    await isItemSimilar.save(function (err) {
        if (err) {
            res.send(err)
        } else {
            res.send('ok')
        }
    });

}

const getAllSimilarItems = () => {

}

const getAllUnsimilarItems = () => {

}

const dbController = {
    setItemSimilarity,
}

module.exports = dbController;