const express = require('express');
const router = express.Router();
const getItems = require('../controllers/getItems');


const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get('/:keywords/:freeShippingOnly/:pageNumber', asyncMiddleware(getItems));

module.exports = router;