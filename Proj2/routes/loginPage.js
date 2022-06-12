const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'loginPage.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}

		res.setHeader('Content-Type', 'text/html')
		res.write(page)
		res.end();
	});
})

router.get('/createUser', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'createUser.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}

		res.setHeader('Content-Type', 'text/html')
		res.write(page)
		res.end();
	});
})

router.post('/createUser', urlencodedParser, (req, res) => {

	var name = req.body.name;
	var surname = req.body.surname;
	var username = req.body.username;
	var password = req.body.password;
	var description = req.body.description;

	db.all("INSERT INTO users (name, surname, username, password, description) VALUES (?,?,?,?,?)", [name, surname, username, password, description], function(err, rows) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('/index');
	})
})

router.get('/delete', (req, res, next) => {
	var name = req.query.name;
	
	if ('name' in req.query) {
		
		db.all("DELETE FROM users where name = ?",[name], function(err, rows){
			if (err) {
				console.error(err);
				return;
			}
			res.redirect('/index');
			
		})
	} else {
		res.status(404).sendFile(path.join(__dirname, '..', 'views', 'bookNotFound.html')) // opens a new page like "page not found"
	}

})

module.exports = router; 
