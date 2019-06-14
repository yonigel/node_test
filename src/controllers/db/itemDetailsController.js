const ItemDetailsSchema = require('../../models/itemDetails');

const saveSingleItemDetails = async (item) => {
    const existRelatedItems = await ItemDetailsSchema.find({itemId: item.id, itemStore: item.store}).exec();
    if (existRelatedItems.length > 0) {
        return;
    }
    const itemDetails = new ItemDetailsSchema(
        {
            itemId: item.id,
            itemStore: item.store,
            itemURL: item.itemURL
        }
    );
    await itemDetails.save(function (err) {
        if (err) {
            return next(err);
        }
    })
}

const setItemsDetails = async (itemList) => {
    const itemsRequests = itemList.map((item) => saveSingleItemDetails(item));
    await Promise.all(itemsRequests);
}

const getItemDetails = async (id, store) => {
    const itemDetails = await ItemDetailsSchema.find({itemId: id, itemStore: store}).exec();
    return itemDetails[0];
}

const dbController = {
    setItemsDetails,
    getItemDetails
}

module.exports = dbController;