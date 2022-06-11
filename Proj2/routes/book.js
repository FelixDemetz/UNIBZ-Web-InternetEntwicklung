const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')


const sqlite3 = require('sqlite3')
const { text } = require('express')
const db = new sqlite3.Database('./addressbook.sqlite');

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('name' in req.query) {
		db.all("SELECT * FROM addressbook WHERE name=$name", {$name: req.query.name}, function(err, row) {
			if (row.length == 1) {
				
				let user = row[0];
			
				fs.readFile(path.join(__dirname, '..', 'views', 'detail.html'), 'utf8', (err, page) => {
					if (err) {
						console.error(err);
						return;
					}

					page = page.replace('{%name%}', user.name)
					page = page.replace('{%username%}', user.username)
					page = page.replace('{%surname%}', user.surname)
					page = page.replace('{%description%}', user.description)

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

router.get('/newBook', (req, res) => { // opens the newBook.html

	fs.readFile(path.join(__dirname, '..', 'views', 'newBook.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}
		res.setHeader('Content-Type', 'text/html')
		res.write(page)
		res.end();
	});
})

router.get('/page', (req, res) => {

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

router.post('/newBook', urlencodedParser, (req, res) => {

	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var description = req.body.description;

	db.all("INSERT INTO addressbook (isbn, title, author, description) VALUES (?,?,?,?)", [isbn, title, author, description], function(err, rows) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('/');
	})
})

router.get('/delete', (req, res, next) => {
	var isbn = req.query.isbn;
	
	if ('isbn' in req.query) {
		
		db.all("DELETE FROM addressbook where isbn = ?",[isbn], function(err, rows){
			if (err) {
				console.error(err);
				return;
			}
			res.redirect('/');
			
		})
	} else {
		res.status(404).sendFile(path.join(__dirname, '..', 'views', 'bookNotFound.html')) // opens a new page like "page not found"
	}

})

module.exports = router; 