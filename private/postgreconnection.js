var { Client } = require('pg');
require('dotenv').config();

var client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
    ssl: true,
});

module.exports = client;
