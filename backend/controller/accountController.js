/*'use strict'

const accountData = require('../data/events');

console.log("in account controller")
const getAccounts = async(req, res, next) => {
    try {
        console.log("in account controller function")
        const accounts = await accountData.getAccounts();
    } catch (error) {
        console.log("error in account controller")
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAccounts
}*/