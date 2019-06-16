require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const api = require('./src/index');
const port = process.env.PORT;
const mongoDB = process.env.DB_CONNECTION_STRING;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', router);

app.use('/api/v1', api);

app.use(express.static(__dirname + '/views'));


router.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

router.get('/questions', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

router.get('/itemList', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

router.get('/item/:store/:id', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

router.get('/admin', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))