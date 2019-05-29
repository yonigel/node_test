const express = require('express');
const api = express();
const itemsRouter = require('./routes/itemsRouter');

api.use('/items', itemsRouter)
module.exports = api