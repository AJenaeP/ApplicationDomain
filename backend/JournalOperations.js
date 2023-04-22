var config = require('./dbconfig')
const sql = require('mssql')

//executing stored procedures:

async function getJournals() { //getting all journals
    try {
        let pool = await sql.connect(config);
        let journals = await pool.request()
            .input('ref', '')
            .input('account_name', '')
            .input('date', '')
            .input('debit', '')
            .input('credit', '')
            .input('journal_status', '')
            .input('comment', '')
            .input('Type', 'SELECT')
            .execute('Journal_Management');
        return journals.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function getJournal(data) { //getting a certain journal
    try {
        let pool = await sql.connect(config);
        let journal = await pool.request()
            .input('ref', data.ref)
            .input('account_name', data.account_name)
            .input('date', data.date)
            .input('debit', data.debit)
            .input('credit', data.credit)
            .input('journal_status', data.journal_status)
            .input('comment', data.comment)
            .input('Type', 'SELECT_FROM')
            .execute('Journal_Management');
        return journal.recordsets;
    } catch (error) {
        console.log(error)
    } 
}
async function getJournalbyRefStatus(ref) { 
    try {
        let pool = await sql.connect(config);
        let journal = await pool.request()
            .input('ref', ref)
            .input('journal_status', journal.journal_status)
            .input('Type', 'SELECT_FROM_ACCTNUM')
            .execute('Journal_Management')
        return journal.recordsets;
    } catch (error) {
        console.log(error)
    }
} 
async function addJournal(journal) { //inserting a journal
    try {
        let pool = await sql.connect(config);
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
    } catch (error) {
        console.log(error)
    }
}
async function deleteJournal(journal) { //deleting a journal
    try {
        let pool = await sql.connect(config);
        let journalDel = await pool.request()
            .input('ref', journal.ref)
            .input('account_name', '')
            .input('date', '')
            .input('debit', '')
            .input('credit', '')
            .input('journal_status', '')
            .input('comment', '')
            .input('Type', 'DELETE')
            .execute('Journal_Management');
        return journalDel.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function updateJournal(journal) { //updating a journal
    try {
        let pool = await sql.connect(config);
        let journalUpdate = await pool.request()
            .input('ref', journal.ref)
            .input('account_name', journal.journalName)
            .input('date', journal.date)
            .input('debit', journal.debit)
            .input('credit', journal.credit)
            .input('journal_status', journal.journalStatus)
            .input('comment', journal.comment)
            .input('Type', 'UPDATE')
            .execute('Journal_Management');
        return journalUpdate.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function getJournalErrors() { //gets errors from database
    try {
        let pool = await sql.connect(config);
        let errors = await pool.request().query("SELECT * from Errors")
        return errors.recordsets;
    } catch (error) {
        console.log(error);
    }
}
//exports functions to api
module.exports = { 
    getJournals: getJournals,
    getJournal: getJournal,
    addJournal: addJournal,
    getJournalErrors: getJournalErrors,
    deleteJournal: deleteJournal,
    updateJournal: updateJournal
}