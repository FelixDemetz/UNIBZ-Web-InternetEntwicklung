const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}
		
		let table_html = ''
		req.app.locals.books.forEach(
			el => table_html = table_html + 
				'<tr>' + 
				'<td>' + el['isbn'] + '</td>' + 
				'<td>' + el['title'] + '</td>' + 
				'<td>' + el['author'] + '</td>' + 
				'<td><a href="/book?isbn=' + el['isbn'] + '">Detail</a></td>' +
				'<td><a href="/book/delete?isbn=' + el['isbn'] + '">Delete</a></td>' + // link to met that deletes certain book
				'</tr>'
		);
		page = page.replace('{%table%}', table_html)
		
		res.setHeader('Content-Type', 'text/html')
		res.write(page)
		res.end();
	});
})

module.exports = router; 