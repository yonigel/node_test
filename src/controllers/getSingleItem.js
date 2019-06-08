const axios = require('axios');
const encodeUrl = require('encodeurl')
const ebayHelper = require('../helpers/ebayHelper')

const getEbaySingleItem = async (id) => {
    let queryString = `
        http://open.api.ebay.com/shopping?
        callname=GetSingleItem&
        responseencoding=JSON&
        appid=${process.env.EBAY_APP_KEY}&
        siteid=0&
        version=967&
        ItemID=${id}&
        IncludeSelector=Details,Description,TextDescription,ShippingCosts,ItemSpecifics,Variations,Compatibility
   `;
   queryString = queryString.replace(/\s/g, '');
    return await axios.get(queryString)
    .then(response => {
        return response.data
    })
}

const arrangeEbayItem = (response) => {
    return {
        id: response.Item.ItemID,
        store: "ebay",
        condition: ebayHelper.getConditionText(response.Item.ConditionID),
        smallImageUrl: response.Item.GalleryURL,
        bigImageUrl: response.Item.PictureURL && response.Item.PictureURL.length>0 && response.Item.PictureURL[0],
        title: response.Item.Title,
        price: response.Item.ConvertedCurrentPrice.Value,
        shippingPrice: 0,
        description: response.Item.Description,
        morePictures: response.Item.PictureURL
    }
    // shippingPrice: number,
    // reviewAverage: number,
    // reviews: Review[],
    // : any[],
    // : string
}

const getSingleItem = async (req, res) => {
    if (!req.params.store || !req.params.itemId) {
        throw new Error('some of params are missing')
    }
    const store = req.params.store;
    const itemId = req.params.itemId;
    let result;
    switch (store) {
        case "ebay":
            result = arrangeEbayItem(await getEbaySingleItem(itemId))
        break;
    }

    res.send(result);
}

module.exports = getSingleItem;