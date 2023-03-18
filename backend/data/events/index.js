/*'use strict'

const utils = require('../utils');
const config = require('../../dbconfig')
const sql = require('mssql')

console.log("Starting...");
const getAccounts = async () => {
    try {
        console.log('trying...')
        let pool = await sql.connect(config);
        console.log("Reading rows from the Table...");
        const sqlQueries =  await utils.loadSqlQueries('events')
        const resultSet = await pool.request().query(sqlQueries.accountslist)
        console.log(resultSet)
        return resultSet.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAccounts
}*/