const app = require('./app');
const dotenv = require('dotenv/config');

//! ------------- declaration var config -------------
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
	console.log(`Happy Eid Mubarak! http://localhost:${PORT}/api/v1`);
});
