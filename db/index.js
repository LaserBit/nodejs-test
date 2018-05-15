const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
    ssl: true,
});

module.exports = pool;
