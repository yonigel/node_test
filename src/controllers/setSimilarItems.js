const stringSimilarity = require('string-similarity')

const setSimilarItems = async (req, res) => {
    // console.log(req.body)

    // TODO - add to each item:
    // TODO - is item have similar items - not required since it can be checked with the similar items array
    // TODO - similar items ids and store

    const allItems = req.body;
    let itemsResult;
    // console.log(`setSimilarItems - start`)
    itemsResult = allItems.map((item) => {
        // console.log(`check for item id: ${item.id}`)
        const similarIdsByTitle = getSimilarItemsByTitle(item, allItems );
        item.relatedItems = similarIdsByTitle;
        return item;
        // console.log(`got similarity by title: ${similarIdsByTitle}`)
    })

    res.send(itemsResult)
}



const getSimilarItemsByTitle = (checkItem, allItems) => {

    let result = [];

    allItems.map((item) => {
        const similarity = stringSimilarity.compareTwoStrings(item.title, checkItem.title);
        if(similarity > 0.8) {
            // result.push(item.id)
            result.push({itemId: item.id, itemStore: item.store})
        }
    })

    return result;
}


module.exports = setSimilarItems;