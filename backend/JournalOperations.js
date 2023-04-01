var config = require('./dbconfig')
const sql = require('mssql')

async function getJournals() {
    try {
        let pool = await sql.connect(config);
        let journals = await pool.request()
            .input('ref', '')
            .input('account_name', '')
            .input('date', '')
            .input('debit', '')
            .input('credit', '')
            .input('journal_status', '')
            .input('Type', 'SELECT')
            .execute('Journal_Management');
        return journals.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getJournal(data) {
    console.log(data)
    //let input_parameter = id;
    try {
        let pool = await sql.connect(config);
        let journal = await pool.request()
            .input('ref', data.ref)
            .input('account_name', data.account_name)
            .input('date', '')
            .input('debit', '')
            .input('credit', '')
            .input('journal_status', data.journal_status)
            .input('Type', 'SELECT_FROM')
            .execute('Journal_Management');
        /*.query("SELECT * from ChartOfAccounts WHERE account_number = ? OR account_name = ?")*/
        console.log(journal.recordsets)
        return journal.recordsets;

    } catch (error) {
        console.log(error)
    }
}

async function getJournalbyRefStatus(ref) {
    console.log(ref)
    try {
        let pool = await sql.connect(config);
        let journal = await pool.request()
            .input('ref', ref)
            .input('journal_status', journal.journal_status)
            .input('Type', 'SELECT_FROM_ACCTNUM')
            .execute('Journal_Management')
        //.query("SELECT * from ChartOfAccounts where account_number = @input_parameter")
        return journal.recordsets;
    } catch (error) {
        console.log(error)
    }
} 
async function addJournal(journal) {
    console.log('connecting...')
    try {
        let pool = await sql.connect(config);
        console.log('connecting...')
        console.log(account)
        let insertJournal = await pool.request()
            .input('ref', journal.ref)
            .input('account_name', journal.account_name)
            .input('date', journal.date)
            .input('debit', journal.debit)
            .input('credit', journal.credit)
            .input('journal_status', journal.journal_status)
            .input('Type', 'INSERT')
            .execute('Journal_Management');
        return insertJournal.recordsets;
        console.log('fin')
    } catch (error) {
        console.log(error)
    }
}

async function deleteJournal(journal) {
    try {
        let pool = await sql.connect(config);
        let journalDel = await pool.request()
            .input('ref', journal.ref)
            .input('account_name', '')
            .input('date', '')
            .input('debit', '')
            .input('credit', '')
            .input('journal_status', '')
            .input('Type', 'DELETE')
            .execute('Journal_Management');
        return journalDel.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function updateJournal(journal) {
    console.log(journal)
    try {
        let pool = await sql.connect(config);
        let journalUpdate = await pool.request()
            .input('ref', journal.ref)
            .input('account_name', journal.account_name)
            .input('date', journal.date)
            .input('debit', journal.debit)
            .input('credit', journal.credit)
            .input('journal_status', journal.journal_status)
            .input('Type', 'UPDATE')
            .execute('Journal_Management');
        return journalUpdate.recordsets;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getJournals: getJournals,
    getJournal: getJournal,
    addJournal: addJournal,
    deleteJournal: deleteJournal,
    updateJournal: updateJournal
}