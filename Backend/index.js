const app = require('./app');
const port = 3000;

//initiate with node index.js
//listen for commend
app.listen(port, () => {
	console.log("Server Listening on PORT:", port);
});
