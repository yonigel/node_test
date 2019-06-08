const stringSimilarity = require('string-similarity')
const lodash = require('lodash');


const setSimilarItems = async (req, res) => {
    // TODO - add to each item:
    // TODO - is item have similar items - not required since it can be checked with the similar items array
    // TODO - similar items ids and store

    const allItems = filterSameItems(req.body);

    const itemsWithRelated = allItems.map((item) => {
        const similarIdsByTitle = getSimilarItemsByTitle(item, allItems);
        item.relatedItems = similarIdsByTitle;
        return item;
    });

    // TODO - check if item is the "best"

    const itemsResult = itemsWithRelated.map((newItem) => {
        const itemsRelatedItems = getItemsRelatedItems(newItem, itemsWithRelated);
        // console.log(`found total ${itemsRelatedItems.length} related items`)
        const isItemTheBest = isItemTheBestOfRelated(newItem, itemsRelatedItems, allItems);
        newItem.isItemBest = isItemTheBest;
        return newItem;
        // console.log(`the item best is ${isItemTheBest}`)
    })

    res.send(itemsResult)
}

const filterSameItems = (allItems) => {
    return lodash.uniqBy(allItems, 'id')
}

const getSimilarItemsByTitle = (checkItem, allItems) => {
    let result = [];
    allItems.map((item) => {
        const similarity = stringSimilarity.compareTwoStrings(item.title, checkItem.title);
        if(similarity > 0.7 && item.id != checkItem.id) {
            result.push({id: item.id, store: item.store});
        }
    });
    return result;
}

const isItemTheBestOfRelated = (checkedItem, relatedItems, allItems) => {

    let result = false;

    // prepare related item list
    let allRelatedItems = [];
    
    allRelatedItems.push(checkedItem);

    const detailedRelatedItems = relatedItems.map((relatedItem) => allItems.find((item) => item.id == relatedItem.id && item.store == relatedItem.store))
    detailedRelatedItems.map((item) => allRelatedItems.push(item));

    // add points for item price

    const minimumPrice = allRelatedItems.reduce((min, p) => p.price < min ? p.price : min, allRelatedItems[0].price);
    // console.log(`all related items are`,allRelatedItems.length)
    // console.log(`got minimum price of ${minimumPrice}`)
    return checkedItem.price == minimumPrice;
}

const getPointsByPrice = () => {

}

const getItemsRelatedItems = (checkedItem, allItems) => {
    return allItems.filter((item) => checkedItem.relatedItems.some((relatedItem) => relatedItem.store == item.store && relatedItem.id == item.id ));
}

module.exports = setSimilarItems;