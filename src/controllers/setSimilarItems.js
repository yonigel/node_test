const stringSimilarity = require('string-similarity')
const lodash = require('lodash');
const mcache = require('memory-cache');

const TITLE_SIMILARITY_RATE = 0.7;
const PRICE_SIMILARITY_PRECENTAGE_DIFFERENCE = 0.3;

const setSimilarItems = async (req, res) => {
    const start = new Date();
    // TODO - add to each item:
    // TODO - is item have similar items - not required since it can be checked with the similar items array
    // TODO - similar items ids and store

    const allItems = filterSameItems(req.body);

    let groupedItems = [];
    let skippedItems = 0

    let itemsWithRelated = []
    // allItems.map((item) => {
      
    //     const similarIdsByTitle = getSimilarItemsAlgorithm(item, allItems, groupedItems);
    //     item.relatedItems = similarIdsByTitle;
    
    //     if (similarIdsByTitle.length > 0) {
    //         groupedItems = groupedItems.concat(similarIdsByTitle)
    //     }
            
    //     return itemsWithRelated.push(item);

    // })


    allItems.map((item) => {
        if (!groupedItems.some((groupedItem) => groupedItem.id === item.id && groupedItem.store === item.store)) { // not check if already grouped
            
            const similarIdsByTitle = getSimilarItemsAlgorithm(item, allItems, groupedItems);
            item.relatedItems = similarIdsByTitle;
            if (similarIdsByTitle.length > 0) {
                groupedItems = groupedItems.concat(similarIdsByTitle)
            }
            itemsWithRelated.push(item);
        } else {
            skippedItems++;
        }
    });
    const endDate = new Date()
    console.log(`grouping - total time:`, (endDate.getTime() - start.getTime())/1000)
    // console.log(`total grouped items`,groupedItems)
    console.log(`total skipped items`, skippedItems)
    // TODO - check if item is the "best"
    const isItemBestStart = new Date()
    const itemsResult = itemsWithRelated.map((newItem) => {
        const itemsRelatedItems = getItemsRelatedItems(newItem, itemsWithRelated);
        const isItemTheBest = isItemTheBestOfRelated(newItem, itemsRelatedItems, allItems);
        newItem.isItemBest = isItemTheBest;
        return newItem;
    })
    const isItemBestEnd = new Date()
    console.log(`which is best - total time:`, (isItemBestEnd.getTime() - isItemBestStart.getTime())/1000)
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


const getSimilarItemsAlgorithm = (checkItem, allItems, groupedItems) => {
    let result = [];
    allItems.map((item) => {
    
        // if (groupedItems.some((grouedItem) => grouedItem.id == item.id && grouedItem.store == item.store)) {
        //     return;
        // }
        // else
        if (item.id != checkItem.id && areItemsSimilar(item, checkItem)) {
            result.push({id: item.id, store: item.store, price: item.price});
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