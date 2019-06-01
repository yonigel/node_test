const express = require('express');
const router = express.Router();
const getItems = require('../controllers/getItems');
const getSingleItem = require('../controllers/getSingleItem');


const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get('/getSingleItem/:store/:itemId', asyncMiddleware(getSingleItem));
router.get('/:keywords/:freeShippingOnly/:pageNumber', asyncMiddleware(getItems));


module.exports = router;