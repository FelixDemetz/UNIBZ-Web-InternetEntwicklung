const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");


router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'landingPage.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}
		

	res.setHeader('Content-Type', 'text/html')
	res.write(page)
	res.end();

		
	});
})

module.exports = router; 
