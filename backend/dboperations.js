var config = require('./dbconfig')
const sql = require('mssql')

async function getAccounts(){
    try{
        let pool = await sql.connect(config);
        let accounts = await pool.request().query("SELECT * from ChartOfAccounts")
        return accounts.recordsets;
    }catch (error) {
        console.log(error);
    }
}
async function getAccount(account_number) {
    try{
        let pool = await sql.connect(config);
        let account = await pool.request()
        .input('input_parameter', sql.Int, account_number)
        .query("SELECT * from ChartOfAccounts where account_number = @input_parameter")
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
        let insertAccount = await pool.request()
            .input('account_number', sql.Int, account.account_number)
            /*.input('account_name', sql.Int, account.account_name)
            .input('account_description', sql.Int, account.account_description)
            .input('account_category', sql.Int, account.account_category)
            .input('account_subcategory', sql.Int, account.account_subcategory)
            .input('normal_side', sql.Int, account.normal_side)
            .input('initial_balance', sql.Int, account.initial_balance)
            .input('debit', sql.Int, account.debit)
            .input('credit', sql.Int, account.credit)
            .input('balance', sql.Int, account.balance)  
            .input('userId', sql.Int, account.userId)
            .input('date_time_account_added', sql.Int, account.date_time_account_added)
            .input('order_num', sql.Int, account.order_num)
            .input('statement', sql.Int, account.statement)
            .input('comment', sql.Int, account.comment)*/
            .input('Type', sql.VarChar,'INSERT')
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
        let account = await pool.request()
            .input('input_parameter', sql.Int, account.account_number)
            .query("DELETE from ChartOfAccounts where account_number = @input_parameter")
        return account.recordsets;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAccounts : getAccounts,
    getAccount : getAccount,
    addAccount : addAccount,
    deleteAccount : deleteAccount
}