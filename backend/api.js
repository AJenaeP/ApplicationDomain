/*var express = require("express");
var router = express.Router();

router.get('/', function(req,res,next){
    res.send("API is working properly")
});

module.exports = router;*/

var Db = require('./dboperations')
var chartOfAccounts = require('./CoA')
const dboperations = require('./dboperations')

//all required libraries for API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express() //express object
const router = express.Router(); //express router object
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

app.use(express.static(path.resolve(__dirname, '../compass/build')));

//use this to test API is working on call
router.use((request,response, next) => {
    console.log("API is working properly")
    //response.json({ "users": ["users1", "users2", "user3"] })
    next();
})

//operation
router.route('/accounts').get((request,response) => {
    dboperations.getAccounts().then(result => {
        response.json(result[0])
    })
})
router.route('/accounts/:account_number').get((request, response) => {

    dboperations.getAccount(request.params.account_number).then(result => {
        response.json(result[0])
    })
})
router.route('/accounts').post((request, response) => {
    console.log("post is working")

    let account = {...request.body}
    dboperations.addAccount(account).then(result => {
        response.status(201).json(result);
    })
})

router.route('/accounts/delete').post((request, response) => {
    console.log("post is working")

    let account = { ...request.body }
    dboperations.deleteAccount(account).then(result => {
        response.status(201).json(result);
    })
})


router.route('/*').get((req, res) => {
    res.sendFile(path.resolve(__dirname, '../compass/build', 'index.html'));
});

var port = process.env.PORT || 1433
app.listen(port, () => 
    console.log('Chart of Account API is running at ' + port)
)



