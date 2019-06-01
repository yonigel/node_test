const axios = require('axios');
const encodeUrl = require('encodeurl')

//   itemFilter: [
//     {name: 'FreeShippingOnly', value: freeShippingOnly},
//     {name: 'MinPrice', value: minPrice},
//     {name: 'MaxPrice', value: maxPrice},
//     {name: 'AvailableTo', value: countryCode},
//     {name: 'TopRatedSellerOnly', value: topRatedSellerOnly},
//     {name: 'FeaturedOnly', value: false},
//     {name: 'HideDuplicateItems', value: true},
//     {name: 'ListingType', value: 'FixedPrice'}
//   ]

const getEbayItems = async (keywords, freeShippingOnly) => {
    const queryKeywords = encodeUrl(keywords);
    let queryString = `http://svcs.ebay.com/services/search/FindingService/v1?
    OPERATION-NAME=findItemsAdvanced&
    SERVICE-VERSION=1.0.0&
    SECURITY-APPNAME=${process.env.EBAY_APP_KEY}&
    RESPONSE-DATA-FORMAT=JSON&
    REST-PAYLOAD=true&
    paginationInput.entriesPerPage=100&
    keywords=${queryKeywords}&
    affiliate.customId=${process.env.EBAY_AFFILIATE_CUSTOM_ID}&
    affiliate.geoTargeting=${process.env.EBAY_AFFILIATE_GEO_TARGETING}&
    affiliate.networkId=${process.env.EBAY_AFFILIATE_NETWORK_ID}&
    affiliate.trackingId=${process.env.EBAY_AFFILIATE_TRACKING_ID}&
    itemFilter.name=FreeShippingOnly&itemFilter.value=${freeShippingOnly}&
    descriptionSearch=true&
    outputSelector(0)=SellerInfo&
    outputSelector(1)=GalleryInfo&
    outputSelector(2)=StoreInfo&
    outputSelector(3)=PictureURLLarge&
    outputSelector(4)=PictureURLSuperSize
    `
    ;
    queryString = queryString.replace(/\s/g, '');
    return await axios.get(queryString)
    .then(response => {
        return response.data
    })
}

const getConditionText = (condition) => {
    switch (condition) {
        case 1000:
            return "new";
        case 1500:
            return "new other" ;
        case 1750:
            return "new with defects";
        case 2000:
            return "manufacturer refurbished";
        case 2500:
            return "Seller refurbished";
        case 3000:
            return "used";
        case 4000:
            return "very good";
        case 5000:
            return "good";
        case 6000:
            return "acceptable";
        case 7000:
            return "for parts or not working";
    }
}

const arrangeItemFromEbay = (data) => {
    const itemList = data.findItemsAdvancedResponse[0].searchResult[0].item;
    let arrengedData = [];
    console.log(itemList[0].pictureURLSuperSize)
    itemList.map((item) => {
        arrengedData.push({
            id: item.itemId[0],
            store: "ebay",
            condition: getConditionText(item.condition[0].conditionId[0]),
            smallImageUrl: item.galleryURL[0],
            bigImageUrl: item.pictureURLSuperSize && item.pictureURLSuperSize[0],
            morePictures: [],
            description: '',
            title: item.title[0],
            price: item.sellingStatus[0].currentPrice[0].__value__,
            shippingPrice: item.shippingInfo[0].shippingServiceCost[0].__value__,
            reviewAverage: 0,
            reviews: [],
            itemURL: item.viewItemURL[0]
        })
    });
    return arrengedData;
}

const getItems = async (req, res) => {
    if (!req.params.keywords || !req.params.freeShippingOnly) {
        throw new Error('some of params are missing')
    }
    const keywords = req.params.keywords;
    const freeShippingOnly = req.params.freeShippingOnly;
    const ebayRaw = await getEbayItems(keywords, freeShippingOnly);
    const ebayItems = arrangeItemFromEbay(ebayRaw);
    // res.send(ebayRaw);
    res.send(ebayItems);
}

module.exports = getItems;