const axios = require('axios');
require('dotenv').config();

const baseURL = 'http://open.api.ebay.com/shopping?';

const getEbayItems = async (keywords) => {
    return await axios.get(`http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=${process.env.EBAY_APP_KEY}&siteid=0&version=967&QueryKeywords=harry%20potter&AvailableItemsOnly=true&MaxEntries=2`)
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