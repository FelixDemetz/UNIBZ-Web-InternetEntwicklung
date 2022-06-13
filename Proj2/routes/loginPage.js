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
		
		db.all("SELECT * FROM users", function(err, rows) {
				let table_html = ''
				rows.forEach(
					el => table_html = table_html + 
						'<tr>' + 
						'<td>' + el['name'] + '</td>' + 
						'<td>' + el['surname'] + '</td>' + 
						'<td>' + el['username'] + '</td>' + 
						'<td>' + el['password'] + '</td>' + 
						'<td>' + el['description'] + '</td>' + 
						'<td><a href="/home?name=' + el['name'] + '">Detail</a></td>' +
						'<td><a href="/login/delete?name=' + el['name'] + '">Delete</a></td>' + 
						'</tr>'
				);
				page = page.replace('{%table%}', table_html)

				res.setHeader('Content-Type', 'text/html')
				res.write(page)
				res.end();
		});

		
	});
})

// register user
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

// register user
router.post('/createUser', urlencodedParser, (req, res) => {

	var sameUser = req.body.username;
	db.all("SELECT * FROM users", function(err, row) {
		let curuser = row[0];
		if (curuser?.username === sameUser) { // if user was already registert with same username show error
			res.status(405).sendFile(path.join(__dirname, '..', 'views', '405.html'))
		} else {
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
				
			db.all("CREATE TABLE " + username + "(posts TEXT NOT NULL);")
					
			res.redirect('/login')
			});
		}
	});
})

module.exports = router; 
