var config = require("./dbconfig");
const sql = require("mssql");

//executing stored procedures:

async function getAccounts() {
  //select all
  console.log("connecting...");
  try {
    let pool = await sql.connect(config);
    let accounts = await pool
      .request()
      .input("account_number", "")
      .input("account_name", "")
      .input("account_description", "")
      .input("account_category", "")
      .input("account_subcategory", "")
      .input("initial_balance", "")
      .input("balance", "")
      .input("userId", "")
      .input("date_time_account_added", "")
      .input("account_status", "")
      .input("statement", "")
      .input("Type", "SELECT")
      .execute("COA_Management");
    return accounts.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getAccount(data) {
  //select all from
  console.log("connecting...");
  try {
    let pool = await sql.connect(config);
    let account = await pool
      .request()
      .input("account_number", sql.Int, data.account_number)
      .input("account_name", data.account_name)
      .input("account_description", "")
      .input("account_category", data.account_category)
      .input("account_subcategory", "")
      .input("initial_balance", "")
      .input("balance", "")
      .input("userId", "")
      .input("date_time_account_added", "")
      .input("account_status", "")
      .input("statement", sql.VarChar, data.statement)
      .input("Type", "SELECT_FROM")
      .execute("COA_Management");
    return account.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function addAccount(account) {
  //insert
  console.log("connecting...");
  try {
    let pool = await sql.connect(config);
    let insertAccount = await pool
      .request()
      .input("account_number", account.accountNumber)
      .input("account_name", account.accountName)
      .input("account_description", account.accountDescription)
      .input("account_category", account.accountCategory)
      .input("account_subcategory", account.accountSubcategory)
      .input("initial_balance", account.initialBalance)
      .input("balance", account.balance)
      .input("userId", account.userId)
      .input("date_time_account_added", account.dateTime)
      .input("account_status", account.accountStatus)
      .input("Type", "INSERT")
      .execute("COA_Management");
    return insertAccount.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function deleteAccount(account) {
  console.log("connecting...");
  try {
    let pool = await sql.connect(config);
    let accountDel = await pool
      .request()
      .input("account_number", account.account_number)
      .input("account_name", "")
      .input("account_description", "")
      .input("account_category", "")
      .input("account_subcategory", "")
      .input("initial_balance", "")
      .input("balance", "")
      .input("userId", "")
      .input("date_time_account_added", "")
      .input("account_status", "")
      .input("Type", "DELETE")
      .execute("COA_Management");
    return accountDel.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateAccount(account) {
  //update account
  console.log("connecting...");
  try {
    let pool = await sql.connect(config);
    let accountUpdate = await pool
      .request()
      .input("account_number", account.accountNumber)
      .input("account_name", account.accountName)
      .input("account_description", account.accountDescription)
      .input("account_category", account.accountCategory)
      .input("account_subcategory", account.accountSubcategory)
      .input("initial_balance", account.initialBalance)
      .input("balance", account.balance)
      .input("userId", account.userId)
      .input("date_time_account_added", account.dateTime)
      .input("account_status", account.accountStatus)
      .input("Type", "UPDATE")
      .execute("COA_Management");
    return accountUpdate.recordsets;
  } catch (error) {
    console.log(error);
  }
}
//exports functions to api
module.exports = {
  getAccounts: getAccounts,
  getAccount: getAccount,
  addAccount: addAccount,
  deleteAccount: deleteAccount,
  updateAccount: updateAccount,
};
