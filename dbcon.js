var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kleinro',
  password        : '5065',
  database        : 'cs340_kleinro'
});

module.exports.pool = pool;