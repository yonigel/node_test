require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const api = require('./src/index');
const port = process.env.PORT;
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', router);

app.use('/api/v1', api);

app.use(express.static(__dirname + '/views'));


router.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))