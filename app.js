const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = express.Router();



app.use('/', router);

app.use(express.static(__dirname + '/views'));


router.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))