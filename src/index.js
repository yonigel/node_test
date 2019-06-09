const express = require('express');
const api = express();
const itemsRouter = require('./routes/itemsRouter');
const dbRouter = require('./routes/dbRouter');

api.use('/items', itemsRouter);
api.use('/db', dbRouter);

module.exports = api