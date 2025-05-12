	//set up database connection string
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '111362',
      database: 'lms'
    });
    connection.connect((err) => {
      if (err) {
        throw new Error('Error connecting to database:', err);
      }
    });
    module.exports = connection;