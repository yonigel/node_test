const express = require('express');
const router = express.Router();
const dbController = require('../controllers/db/relatedItemsController');
const isItemSimilarController = require('../controllers/db/isItemSimilarController');
const algorithmController = require('../controllers/db/algorithmStatsController');

router.get('/getRelatedItems/:itemId/:itemStore', dbController.getRelatedItems);
router.get('/getItemURL/:itemId/:itemStore', dbController.getItemsURL);
router.get('/getAlgorithmRightPercentage', algorithmController.getRightPercentage);
router.post('/setRelatedItems', dbController.setRelatedItems);
router.post('/setIsItemSimilar', isItemSimilarController.setItemSimilarity);

module.exports = router;