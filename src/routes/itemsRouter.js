const express = require('express');
const router = express.Router();
const getItems = require('../controllers/getItems');
const getSingleItem = require('../controllers/getSingleItem');
const setSimilarItems = require('../controllers/setSimilarItems');

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get('/getSingleItem/:store/:itemId', asyncMiddleware(getSingleItem));
router.get('/:keywords/:freeShippingOnly/:pageNumber', asyncMiddleware(getItems));
router.post('/setSimilarItems', asyncMiddleware(setSimilarItems));


module.exports = router;