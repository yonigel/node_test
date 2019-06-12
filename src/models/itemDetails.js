const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemDetailsSchema = new Schema({
    itemId: {type: String, required: true, max: 100},
    itemStore: {type: String, required: true},
    itemURL: {type: String, required: true}
});

module.exports = mongoose.model('ItemDetails', ItemDetailsSchema);