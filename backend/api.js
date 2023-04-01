var chartOfAccounts = require('./CoA')
const CoAoperations = require('./CoAoperations')
const fboperations = require('./fboperations')
const ledgerOperations = require('./LedgerOperations')
const journalOperations = require('./JournalOperations')

//all required libraries for API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express() //express object
const router = express.Router(); //express router object
const path = require('path');
const { Int } = require('mssql')

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
    CoAoperations.getAccounts().then(result => {
        response.json(result[0])
    })
})
router.route('/account/:data').get((request, response) => {
    console.log(JSON.parse(request.params.data))
    const data = JSON.parse(request.params.data);
    //console.log(data)
    //console.log(data)
    CoAoperations.getAccount(data).then(result => {
        response.json(result)
    })
})
/*router.route('/accounts/:id').get((request, response) => {
    console.log('is this account number ')
    const id = request.params.id
    CoAoperations.getAccount(id).then(result => {
        response.json(result[0])
        response.send(result)
    })
})*/
/*router.route('/accounts/:account_number').get((request, response) => {
   console.log('is this account number ')
    /*CoAoperations.getAccountbyNum(Number(request.params.account_number)).then(result => {
        response.json(result[0])
    })*//*
})*//*
router.route('/accounts/:account_name').get((request, response) => {
    console.log('is this account name ')
    /*CoAoperations.getAccountbyName((request.params.account_name)).then(result => {
        response.json(result[0])
    })*//*
})*/
router.route('/accounts/add').post((request, response) => {
    console.log("post is working")

    let account = request.body
    CoAoperations.addAccount(account).then(result => {
        response.status(201).json(result);
    })
})

router.route('/accounts/delete').delete((request, response) => {
    console.log("delete is working")

    let account = request.body 
    CoAoperations.deleteAccount(account).then(result => {
        response.status(201).json(result);
    })
})
router.route('/accounts/update').put((request, response) => {
    console.log("update is working")

    let account = request.body
    console.log(account)
    CoAoperations.updateAccount(account).then(result => {
        response.status(201).json(result);
    })
})

router.route('/users').get((request, response) => {
    fboperations.getUsers().then(result => {
        response.status(201).json(result);
    })
})

//operation
router.route('/ledgers').get((request, response) => {
    ledgerOperations.getLedgers().then(result => {
        response.json(result[0])
    })
})

router.route('/ledger/:data').get((request, response) => {
    console.log(JSON.parse(request.params.data))
    const data = JSON.parse(request.params.data);
    //console.log(data)
    //console.log(data)
    ledgerOperations.getLedger(data).then(result => {
        response.json(result)
    })
})
router.route('/journals').get((request, response) => {
    journalOperations.getJournals().then(result => {
        response.json(result[0])
    })
})
router.route('/journal/:data').get((request, response) => {
    console.log(JSON.parse(request.params.data))
    const data = JSON.parse(request.params.data);

    journalOperations.getJournal(data).then(result => {
        response.json(result[0])
    })
})
router.route('/journals/add').post((request, response) => {
    console.log("post is working")

    let journal = request.body
    journalOperations.addJournal(journal).then(result => {
        response.status(201).json(result);
    })
})
router.route('/journals/delete').delete((request, response) => {
    console.log("delete is working")

    let journal = request.body
    jounalOperations.deleteJournal(journal).then(result => {
        response.status(201).json(result);
    })
})
router.route('/journals/update').put((request, response) => {
    console.log("update is working")

    let account = request.body
    console.log(account)
    journalOperations.updateJournal(journal).then(result => {
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



