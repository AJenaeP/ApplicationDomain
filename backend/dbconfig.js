//configurations to connect to database

'use strict'

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    SQL_USER,
    SQL_PASSWORD,
    SQL_PORT,
    SQL_DATABASE,
    SQL_SERVER,
    SQL_ENCRYPT,
} = process.env;

const sqlEncrypt = process.env.ENCRYPT === "true";
const sqlAuth = process.env.AUTHENTICAION === "default";

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

const config = {
    user: SQL_USER, // better stored in an app setting such as process.env.DB_USER
    password: SQL_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
    server: SQL_SERVER, // better stored in an app setting such as process.env.DB_SERVER
    port: Number(SQL_PORT), // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: SQL_DATABASE, // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: Boolean(SQL_ENCRYPT),
    }
}

module.exports = config