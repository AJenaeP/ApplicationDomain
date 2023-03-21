var config = require('./dbconfig')
const sql = require('mssql')

async function getAccounts(){
    try{
        let pool = await sql.connect(config);
        let accounts = await pool.request()
            .input('account_number','')
            .input('account_name', '')
            .input('account_description', '')
            .input('account_category', '')
            .input('account_subcategory', '')
            .input('normal_side', '')
            .input('initial_balance','')
            .input('debit', '')
            .input('credit',  '')
            .input('balance', '')
            .input('userId',  '')
            .input('date_time_account_added',  '')
            .input('order_num',  '')
            .input('statement',  '')
            .input('comment',  '')
            .input('account_status', '')
            .input('Type', 'SELECT')
            .execute('COA_Management');
        return accounts.recordsets;
    }catch (error) {
        console.log(error);
    }
}
async function getAccount(account_number) {
    try{
        let pool = await sql.connect(config);
        let account = await pool.request()
            .input('account_number', account_number)
            .input('account_name', account_name)
            .input('Type', 'SELECT_FROM')
            .execute('COA_Management')
        //.query("SELECT * from ChartOfAccounts where account_number = @input_parameter")
        return account.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function addAccount(account) {
    console.log('connecting...')
    try {
        let pool = await sql.connect(config);
        console.log('connecting...')
        console.log(account)
        let insertAccount = await pool.request()
            .input('account_number', account.accountNumber)
            .input('account_name',  account.accountName)
            .input('account_description',  account.accountDescription)
            .input('account_category',  account.accountCategory)
            .input('account_subcategory',  account.accountSubcategory)
            .input('normal_side',  account.normalSide)
            .input('initial_balance',  account.initialBalance)
            .input('debit',  account.debit)
            .input('credit',  account.credit)
            .input('balance', account.balance)  
            .input('userId',  account.userId)
            .input('date_time_account_added',  account.dateTime)
            .input('order_num',  account.orderNumber)
            .input('statement',  account.statement)
            .input('comment', account.comment)
            .input('account_status', account.accountStatus)
            .input('Type', 'INSERT')
            .execute('COA_Management');
        return insertAccount.recordsets;
        console.log('fin')
    } catch (error) {
        console.log(error)
    }
}
async function deleteAccount(account) {
    try {
        let pool = await sql.connect(config);
        let accountDel = await pool.request()
            .input('account_number', account.account_number)
            .input('account_name', '')
            .input('account_description', '')
            .input('account_category', '')
            .input('account_subcategory', '')
            .input('normal_side', '')
            .input('initial_balance', '')
            .input('debit', '')
            .input('credit', '')
            .input('balance', '')
            .input('userId', '')
            .input('date_time_account_added', '')
            .input('order_num', '')
            .input('statement', '')
            .input('comment', '')
            .input('account_status', '')
            .input('Type', 'DELETE')
            .execute('COA_Management');
        return accountDel.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function updateAccount(account) {
    console.log(account)
    try {
        let pool = await sql.connect(config);
        let accountUpdate = await pool.request()
            .input('account_number', account.accountNumber)
            .input('account_name', account.accountName)
            .input('account_description', account.accountDescription)
            .input('account_category', account.accountCategory)
            .input('account_subcategory', account.accountSubcategory)
            .input('normal_side', account.normalSide)
            .input('initial_balance', account.initialBalance)
            .input('debit', account.debit)
            .input('credit', account.credit)
            .input('balance', account.balance)
            .input('userId', account.userId)
            .input('date_time_account_added', account.dateTime)
            .input('order_num', account.orderNumber)
            .input('statement', account.statement)
            .input('comment', account.comment)
            .input('account_status', account.accountStatus)
            .input('Type', 'UPDATE')
            .execute('COA_Management');
        return accountUpdate.recordsets;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAccounts : getAccounts,
    getAccount : getAccount,
    addAccount : addAccount,
    deleteAccount : deleteAccount,
    updateAccount : updateAccount
}