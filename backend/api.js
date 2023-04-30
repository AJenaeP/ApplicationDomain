const CoAoperations = require("./CoAoperations");
const fboperations = require("./fboperations");
const ledgerOperations = require("./LedgerOperations");
const journalOperations = require("./JournalOperations");

//all required libraries for API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express(); //express object
const router = express.Router(); //express router object
const path = require("path");
const { Int } = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

app.use(express.static(path.resolve(__dirname, "../compass/build")));

//use this to test API is working on call
router.use((request, response, next) => {
  console.log("API is working properly");
  //response.json({ "users": ["users1", "users2", "user3"] })
  next();
});

//routes below:

router.route("/accounts").get((request, response) => {
  console.log("get is starting");
  CoAoperations.getAccounts().then((result) => {
    response.json(result[0]);
  });
});
router.route("/account/:data").get((request, response) => {
  console.log("get is starting");
  const data = JSON.parse(request.params.data);
  CoAoperations.getAccount(data).then((result) => {
    response.json(result);
  });
});
router.route("/accounts/add").post((request, response) => {
  console.log("post is starting");
  let account = request.body;
  CoAoperations.addAccount(account).then((result) => {
    response.status(201).json(result);
  });
});
router.route("/accounts/delete").delete((request, response) => {
  console.log("delete is starting");
  let account = request.body;
  CoAoperations.deleteAccount(account).then((result) => {
    response.status(201).json(result);
  });
});
router.route("/accounts/update").put((request, response) => {
  console.log("update is starting");
  let account = request.body;
  CoAoperations.updateAccount(account).then((result) => {
    response.status(201).json(result);
  });
});
router.route("/users").get((request, response) => {
  console.log("get is starting");
  fboperations.getUsers().then((result) => {
    response.status(201).json(result);
  });
});
router.route("/ledgers").get((request, response) => {
  console.log("get is starting");
  ledgerOperations.getLedgers().then((result) => {
    response.json(result[0]);
  });
});
router.route("/ledger/:data").get((request, response) => {
  console.log("get is starting");
  const data = JSON.parse(request.params.data);
  ledgerOperations.getLedger(data).then((result) => {
    response.json(result);
  });
});
router.route("/journals").get((request, response) => {
  console.log("get is starting");
  journalOperations.getJournals().then((result) => {
    response.json(result[0]);
  });
});
router.route("/journal/:data").get((request, response) => {
  console.log("get is starting");
  const data = JSON.parse(request.params.data);
  journalOperations.getJournal(data).then((result) => {
    response.json(result[0]);
  });
});
router.route("/journals/add").post((request, response) => {
  console.log("post is starting");
  let journal = request.body;
  journalOperations.addJournal(journal).then((result) => {
    response.status(201).json(result);
  });
});
router.route("/journals/delete").delete((request, response) => {
  console.log("delete is starting");
  let journal = request.body;
  journalOperations.deleteJournal(journal).then((result) => {
    response.status(201).json(result);
  });
});
router.route("/journals/update").put((request, response) => {
  console.log("update is starting");
  let journal = request.body;
  journalOperations.updateJournal(journal).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/journalErrors").get((request, response) => {
  console.log("get is starting");
  journalOperations.getJournalErrors().then((result) => {
    response.json(result[0]);
  });
});

//file transfer
router.route("/*").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "../compass/build", "index.html"));
});

//listener
var port = process.env.PORT || 1433;
app.listen(port, () =>
  console.log("Chart of Account API is running at " + port)
);
