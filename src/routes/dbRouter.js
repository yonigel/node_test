const express = require('express');
const router = express.Router();
const dbController = require('../controllers/db/relatedItemsController');

router.get('/getRelatedItems/:itemId/:itemStore', dbController.getRelatedItems);
router.post('/setRelatedItems', dbController.setRelatedItems);

module.exports = router;