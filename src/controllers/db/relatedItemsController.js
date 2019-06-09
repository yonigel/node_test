const RelatedItemsSchema = require('../../models/relatedItems');

const getRelatedItems = (req, res) => {

}

const setRelatedItems = (req, res) => {
    if (!req.body.itemId || !req.body.itemStore || !req.body.relatedIds) {
        throw new Error('some of params are missing')
    }

    let relatedItem = new RelatedItemsSchema(
        {
            itemId: req.body.itemId,
            itemStore: req.body.itemStore,
            relatedItems: req.body.relatedIds
        }
    );

    relatedItem.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('RelatedItemsSchema Created successfully')
    })
}

const dbController = {
    getRelatedItems,
    setRelatedItems
}

module.exports = dbController;