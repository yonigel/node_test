const express = require('express');
const router = express.Router();
const dbController = require('../controllers/db/relatedItemsController');
const isItemSimilarController = require('../controllers/db/isItemSimilarController');

router.get('/getRelatedItems/:itemId/:itemStore', dbController.getRelatedItems);
router.get('/getItemURL/:itemId/:itemStore', dbController.getItemsURL);
router.post('/setRelatedItems', dbController.setRelatedItems);
router.post('/setIsItemSimilar', isItemSimilarController.setItemSimilarity);

module.exports = router;