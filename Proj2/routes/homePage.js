const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('username' in req.query && 'password' in req.query) {
		db.all("SELECT * FROM users WHERE username=$username AND password=$password", {$username: req.query.username, $password: req.query.password}, function(err, row) {
			let curuser = row[0];

			if(curuser.username == req.query.username && curuser.password == req.query.password) {
			
				fs.readFile(path.join(__dirname, '..', 'views', 'homePage.html'), 'utf8', (err, page) => {
					if (err) {
						console.error(err);
						return;
					}

					page = page.replace('{%name%}', curuser.name)
					page = page.replace('{%surname%}', curuser.surname)
					page = page.replace('{%username%}', curuser.username)
					page = page.replace('{%password%}', curuser.password)
					page = page.replace('{%description%}', curuser.description)
				});
			} else {
				res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
			}
		})


		db.all("SELECT * FROM allPosts", function(err, rows) {

			fs.readFile(path.join(__dirname, '..', 'views', 'homePage.html'), 'utf8', (err, page) => {
				if (err) {
					console.error(err);
					return;
				}
				let table_html = ''
				rows.forEach(
					el => table_html = table_html + 
					'<div class="container">' +
					'<div class="container" id="container2">' +
						'<div class="col-sm-12 col-md-8 col-lg-8" style= "padding:3%;">' +
							'<div class="">' +
								'<h2 style="color:black !important">' + el['username'] + '</h2>' +
								'<p style="color:black !important">' + el['posts'] +  '</p>' +
								'<button class="button">' +
									'<a href="">like</a>' +
								'</button>' +
								'<button class="button">' +
									'<a href="">dislike</a>' +
								'</button>' +
							'</div>' +
						'</div>' +
					'</div>'
				);
				page = page.replace('{%feed%}', table_html);
				res.write(page);
					
				res.end();
			});
				
		});
	} else {	
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
	}

})

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


router.post('/newPost', urlencodedParser, (req, res) => {
	var text = req.body.posts;
	var username = 'liuk';
	console.log(req.query);
	

	db.all("INSERT INTO allPosts (username, posts) VALUES (?,?)", [username, text], function(err, rows) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('back');
	})
})



module.exports = router; 
