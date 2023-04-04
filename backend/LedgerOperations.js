var config = require('./dbconfig')
const sql = require('mssql')

async function getLedgers() {
    try {
        let pool = await sql.connect(config);
        let ledgers = await pool.request()
            .input('account_name', '')
            .input('account_number', '')
            .input('ref', '')
            .input('debit', '')
            .input('credit', '')
            .input('balance', '')
            .input('date', '')
            .input('explanation', '')
            .input('Type', 'SELECT')
            .execute('Ledger_Management');
        return ledgers.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getLedger(data) {
    console.log(data)
    //let input_parameter = id;
    try {
        let pool = await sql.connect(config);
        let ledger = await pool.request()
            .input('account_name', data.account_name)
            .input('account_number', sql.Int, data.account_number)
            .input('ref', data.ref)
            .input('debit', data.debit)
            .input('credit', data.credit)
            .input('balance', data.balance)
            .input('date', '')
            .input('explanation', '')
            .input('Type', 'SELECT_FROM')
            .execute('Ledger_Management');
        /*.query("SELECT * from ChartOfAccounts WHERE account_number = ? OR account_name = ?")*/
        console.log(ledger.recordsets)
        return ledger.recordsets;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLedgers: getLedgers,
    getLedger: getLedger,
}