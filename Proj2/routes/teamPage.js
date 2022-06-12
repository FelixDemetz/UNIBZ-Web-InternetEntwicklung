const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')


sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', (req, res) => {

	fs.readFile(path.join(__dirname, '..', 'views', 'teamPage.html'), 'utf8', (err, page) => {
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