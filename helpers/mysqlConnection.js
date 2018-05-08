var mysql = require('mysql');

var dbConfig = {
  host: 'localhost',
  port: process.env.PORT || '8080',
  user: 'root',
  password: '',
  database: 'test_db'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;