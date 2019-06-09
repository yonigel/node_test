const RelatedItemsSchema = require('../../models/relatedItems');

const getRelatedItems = (req, res) => {

}

const setRelatedItems = async (req, res) => {
    if (!req.body.itemId || !req.body.itemStore || !req.body.relatedItems) {
        throw new Error('some of params are missing')
    }

    // TODO - first check if item id and store not exist yet
    // TODO - if exists - do nothing
    let isExists;

    const existRelatedItems = await RelatedItemsSchema.find({itemId: req.body.itemId, itemStore: req.body.itemStore}).exec();
    isExists = existRelatedItems.length > 0

    if (isExists) {
        res.send('related item already exists in db');
        return;
    }
    
    
    let relatedItem = new RelatedItemsSchema(
        {
            itemId: req.body.itemId,
            itemStore: req.body.itemStore,
            relatedItems: req.body.relatedItems
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