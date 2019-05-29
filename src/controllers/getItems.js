const axios = require('axios');

const baseURL = 'http://open.api.ebay.com/shopping?';

const getEbayItems = async (keywords) => {
    return await axios.get('http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=YonatanG-Compare-PRD-95d7504c4-986d20a6&siteid=0&version=967&QueryKeywords=harry%20potter&AvailableItemsOnly=true&MaxEntries=2')
    .then(response => {
        return response.data
    })
}



const getItems = async (req, res) => {
    if (!req.params.keywords) {
        console.log(`keywords is empty`)
        throw new Error('not working')
    }
    const keywords = req.params.keywords;
    console.log(`ebay items start`)
    const ebayItems = await getEbayItems(keywords);
    console.log(`ebay items done`, ebayItems)
    res.send(ebayItems)
}

module.exports = getItems;