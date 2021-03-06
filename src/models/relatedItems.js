const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelatedItemsSchema = new Schema({
    itemId: {type: String, required: true, max: 100},
    itemStore: {type: String, required: true},
    relatedItems: {type: Object, required: true}
});

module.exports = mongoose.model('RelatedItems', RelatedItemsSchema);