	//set up database connection string
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'pass',
      database: 'lms'
    });
    connection.connect((err) => {
      if (err) {
        throw new Error('Error connecting to database:', err);
      }
    });
    module.exports = connection;
