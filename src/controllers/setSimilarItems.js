const stringSimilarity = require('string-similarity')

const setSimilarItems = async (req, res) => {
    // TODO - add to each item:
    // TODO - is item have similar items - not required since it can be checked with the similar items array
    // TODO - similar items ids and store

    const allItems = req.body;
    let itemsResult;
    itemsResult = allItems.map((item) => {
        const similarIdsByTitle = getSimilarItemsByTitle(item, allItems);
        item.relatedItems = similarIdsByTitle;
        return item;
    });

    itemsResult.map((newItem) => {
        getItemsRelatedItems(newItem, itemsResult)
    })

    res.send(itemsResult)
}

const getSimilarItemsByTitle = (checkItem, allItems) => {
    let result = [];
    allItems.map((item) => {
        const similarity = stringSimilarity.compareTwoStrings(item.title, checkItem.title);
        if(similarity > 0.8) {
            result.push({itemId: item.id, itemStore: item.store})
        }
    });
    return result;
}

const checkIfThemIsBest = (checkedItem, allItems) => {

}

const getItemsRelatedItems = (checkedItem, allItems) => {

    let result = [];
    console.log(`check for item`, checkedItem)
    console.log(`check total for ${allItems.length} items`)
    result = allItems.filter((item) => {
        if (checkedItem.relatedItems.some((relatedItem) => relatedItem.itemStore == item.store && relatedItem.itemId == item.id )) {
            return true;
        }
    })
    console.log(`total related items:`, result.length)

}

module.exports = setSimilarItems;