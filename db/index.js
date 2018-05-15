const { Client } = require('pg');
require('dotenv').config();

const client = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
    ssl: true,
});

module.exports = client;
