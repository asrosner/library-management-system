// declares
    const express = require('express');
	const cors = require('cors');
    const connection = require('./db');
    const app = express();
    app.use(express.json());

	//disable CORS error
	app.use(cors({
	  origin: '*', // Allow requests from any origin
	  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
	  credentials: true, // Allow sending cookies
	  allowedHeaders: 'Content-Type, Authorization' // Allowed headers
	}));

    // GET all books
	//test with localhost:3000/api/books
    app.get('/api/books', async (req, res) => {

	//execute query
	connection.query('select b.name, bi.id, bi.borrowed'
					+ ' from books b'
					+ ' join bookinfo bi on b.id = bi.bookid'
					+ ' order by b.name', (err, results) => {
					
		//unknown error
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve items' });
          return;
        }
		
		//success
        res.json(results);
      });
    });
	
	// checkout
	//test with localhost:3000/api/checkout, body has { "id":2}
	 app.post('/api/checkout', async (req, res) => {
		res = changeBookStatus(res, req.body.id, true);
	});
	
	// return
	//test with localhost:3000/api/return, body has { "id":2}
	 app.post('/api/return', async (req, res) => {
		res = changeBookStatus(res, req.body.id, false);
	});
	
	//change book status
	function changeBookStatus(res, bookId, borrowed) {
		//execute query
		connection.query('UPDATE bookinfo SET borrowed = ? WHERE id = ?', [borrowed, bookId], (err, result) => {

			if (err) {
				//store unknown error in response
			  res.status(500).json({ error: 'Failed to return item' });
			}	
			else if (result.affectedRows === 0) {
				//store missing id error in response
				  res.status(404).json({ message: 'Item not found: ' + bookId });
			}
			else {
				//success
				res.json({ message: 'OK' });
			}			
				
			return res;
		});
	};

	module.exports = app;