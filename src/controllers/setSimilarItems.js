const stringSimilarity = require('string-similarity')
const lodash = require('lodash');
const mcache = require('memory-cache');

const TITLE_SIMILARITY_RATE = 0.7;
const PRICE_SIMILARITY_PRECENTAGE_DIFFERENCE = 0.3;

const setSimilarItems = async (req, res) => {
    // TODO - add to each item:
    // TODO - is item have similar items - not required since it can be checked with the similar items array
    // TODO - similar items ids and store

    const allItems = filterSameItems(req.body);

    const itemsWithRelated = allItems.map((item) => {
        const relatedItemsItemCache = `relatedItemsItemCache_${item.id}_${item.store}`;
        const cachedBody = mcache.get(relatedItemsItemCache)
        if(cachedBody) {
            return cachedBody;
        } else {
            const similarIdsByTitle = getSimilarItemsAlgorithm(item, allItems);
            item.relatedItems = similarIdsByTitle;
            mcache.put(relatedItemsItemCache, item);
            return item;
        }
        
    });

    // TODO - check if item is the "best"

    const itemsResult = itemsWithRelated.map((newItem) => {
        const itemsRelatedItems = getItemsRelatedItems(newItem, itemsWithRelated);
        const isItemTheBest = isItemTheBestOfRelated(newItem, itemsRelatedItems, allItems);
        newItem.isItemBest = isItemTheBest;
        return newItem;
    })
    res.send(itemsResult)
}

const filterSameItems = (allItems) => {
    return lodash.uniqBy(allItems, 'id')
}

const areItemsSimilar = (item1, item2) => {
    const areTitlesSimilar = stringSimilarity.compareTwoStrings(item1.title, item2.title) > TITLE_SIMILARITY_RATE;

    const arePricesSimilar = Math.abs(item1.price-item2.price) / Math.max(item1.price, item2.price) <= PRICE_SIMILARITY_PRECENTAGE_DIFFERENCE;

    return areTitlesSimilar && arePricesSimilar;
}


const getSimilarItemsAlgorithm = (checkItem, allItems) => {
    let result = [];
    allItems.map((item) => {
        if (item.id != checkItem.id && areItemsSimilar(item, checkItem)) {
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
    return checkedItem.price == minimumPrice;
}

const getPointsByPrice = () => {

}

const getItemsRelatedItems = (checkedItem, allItems) => {
    return allItems.filter((item) => checkedItem.relatedItems.some((relatedItem) => relatedItem.store == item.store && relatedItem.id == item.id ));
}

module.exports = setSimilarItems;