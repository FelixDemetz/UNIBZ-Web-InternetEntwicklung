const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')


const sqlite3 = require('sqlite3')
const { text } = require('express')
const db = new sqlite3.Database('./Users.sqlite');

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var row = [];

router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('name' in req.query) {
		db.all("SELECT * FROM users WHERE name=$name", {$name: req.query.name}, function(err, row) {
			if (row.length == 1) {
				
				let curuser = row[0];
			
				fs.readFile(path.join(__dirname, '..', 'views', 'detail.html'), 'utf8', (err, page) => {
					if (err) {
						console.error(err);
						return;
					}

					page = page.replace('{%name%}', curuser.name)
					page = page.replace('{%surname%}', curuser.surname)
					page = page.replace('{%username%}', curuser.username)
					page = page.replace('{%password%}', curuser.password)
					page = page.replace('{%description%}', curuser.description)

					res.setHeader('Content-Type', 'text/html')
					res.write(page)
					res.end();
				});
			} else {
				res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
			}
		})
	} else {	
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
	}

})

module.exports = router; 