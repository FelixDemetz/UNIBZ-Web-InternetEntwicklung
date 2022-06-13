const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");


router.get('/', (req, res, next) => {

	db.all("SELECT * FROM allPosts", function(err, rows) {

		fs.readFile(path.join(__dirname, '..', 'views', 'feedPage.html'), 'utf8', (err, page) => {
			if (err) {
				console.error(err);
				return;
			}
			let table_html = ''
			rows.forEach(
				el => table_html = table_html + 
				'<div class="container">' +
					'<div class="container" id="container2" style= "margin-bottom: 30">' +
						'<div class="col-sm-12 col-md-8 col-lg-8" style= "padding:1%;">' +
							'<div class="">' +
								'<h2 style="color:' + getRandomColor() +
								'!important">' + el['username'] + '</h2>' +
								'<p style="color:black !important">' + el['posts'] +  '</p>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
				);
				page = page.replace('{%feed%}', table_html);
				res.write(page);
					
				res.end();
			});
				
		});

})

function getRandomColor(){
            var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            return randomColor;
        }

module.exports = router; 
