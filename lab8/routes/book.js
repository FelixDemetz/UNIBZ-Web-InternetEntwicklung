const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


// /admin/add
router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('isbn' in req.query 
				&& req.app.locals.books.find(b => b.isbn === req.query.isbn) !== undefined) {
		
		let curbook = req.app.locals.books.find(function (b) {return b.isbn === req.query.isbn});

		fs.readFile(path.join(__dirname, '..', 'views', 'detail.html'), 'utf8', (err, page) => {
			if (err) {
				console.error(err);
				return;
			}

			page = page.replace('{%isbn%}', curbook.isbn)
			page = page.replace('{%title%}', curbook.title)
			page = page.replace('{%author%}', curbook.author)
			page = page.replace('{%description%}', curbook.description)

			res.setHeader('Content-Type', 'text/html')
			res.write(page)
			res.end();
		});
	} else {
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
	}

})

router.get('/newBook', (req, res, next) => {

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

router.post('/newBook', urlencodedParser, (req, res) => {

	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var description = req.body.description;

	req.app.locals.books.push({isbn, title, author, description});

	res.redirect('/');
	res.end();

})

module.exports = router; 