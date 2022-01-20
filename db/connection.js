const mysql = require('mysql2');

// connect to database and export that connection for other parts of the app
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vandy2803', // changed this to your own local Mysql password
    database: 'employee_db',
});