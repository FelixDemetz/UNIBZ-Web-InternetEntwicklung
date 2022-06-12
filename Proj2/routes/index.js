const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");


router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf8', (err, page) => {
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
						'<td><a href="/book?name=' + el['name'] + '">Detail</a></td>' +
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

module.exports = router; 
