const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./books.sqlite');

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'loginPage.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}
		
		db.all("SELECT * FROM books", function(err, rows) {
				let table_html = ''
				rows.forEach(
					el => table_html = table_html + 
						'<tr>' + 
						'<td>' + el['isbn'] + '</td>' + 
						'<td>' + el['title'] + '</td>' + 
						'<td>' + el['author'] + '</td>' + 
						'<td><a href="/book?isbn=' + el['isbn'] + '">Detail</a></td>' +
						'<td><a href="/book/delete?isbn=' + el['isbn'] + '">Delete</a></td>' + 
						'</tr>'
				);
				page = page.replace('{%table%}', table_html)

				res.setHeader('Content-Type', 'text/html')
				res.write(page)
				res.end();
		});

		
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

router.get('/login/loggedin', (req, res, next) => {
	console.log("Hello world!");
	console.error("hi");
	res.redirect('/sex');
})

router.post('/createUser', urlencodedParser, (req, res) => {

	var isbn = req.body.isbn[0];
	var title = req.body.title;
	var author = req.body.author;
	var description = req.body.description;

	db.all("INSERT INTO books (isbn, title, author, description) VALUES (?,?,?,?)", [isbn, title, author, description], function(err, rows) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('/login');
	})
})

router.get('/delete', (req, res, next) => {
	var isbn = req.query.isbn;
	
	if ('isbn' in req.query) {
		
		db.all("DELETE FROM books where isbn = ?",[isbn], function(err, rows){
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
