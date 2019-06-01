const axios = require('axios');
const encodeUrl = require('encodeurl')

const getEbaySingleItem = async (id) => {
    let queryString = `
        http://open.api.ebay.com/shopping?
        callname=GetSingleItem&
        responseencoding=JSON&
        appid=${process.env.EBAY_APP_KEY}&
        siteid=0&
        version=967&
        ItemID=${id}
   `;
   queryString = queryString.replace(/\s/g, '');
    return await axios.get(queryString)
    .then(response => {
        return response.data
    })
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
            result = await getEbaySingleItem(itemId)
        break;
    }

    res.send(result);
}

module.exports = getSingleItem;