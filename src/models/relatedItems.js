const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RelatedItemsSchema = new Schema({
    itemId: {type: String, required: true, max: 100},
    itemStore: {type: String, required: true},
    relatedItems: {type: Object, required: true}
});


// Export the model
module.exports = mongoose.model('RelatedItems', RelatedItemsSchema);