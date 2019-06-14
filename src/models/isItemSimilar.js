const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IsItemSimilarSchema = new Schema({
    itemId: {type: String, required: true, max: 100},
    itemStore: {type: String, required: true},
    isSimilar: {type: Boolean, required: true}
});

module.exports = mongoose.model('IsItemSimilar', IsItemSimilarSchema);