const RelatedItemsSchema = require('../../models/relatedItems');

const getRelatedItems = async (req, res) => {
    const existRelatedItems = await RelatedItemsSchema.find({itemId: req.params.itemId, itemStore: req.params.itemStore}).exec();
    res.send(existRelatedItems[0].relatedItems)
}

const getItemsURL = async (req, res) => {
    const existRelatedItems = await RelatedItemsSchema.find({itemId: req.params.itemId, itemStore: req.params.itemStore}).exec();
    res.send(existRelatedItems[0].itemLink)
}

const setRelatedItems = async (req, res) => {
    if (!req.body.itemId || !req.body.itemStore || !req.body.relatedItems || !req.body.itemLink) {
        throw new Error('some of params are missing')
    }

    const existRelatedItems = await RelatedItemsSchema.find({itemId: req.body.itemId, itemStore: req.body.itemStore}).exec();

    if (existRelatedItems.length > 0) {
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
    setRelatedItems,
    getItemsURL
}

module.exports = dbController;