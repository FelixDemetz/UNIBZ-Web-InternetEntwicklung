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
			
			// if username and password is the correct one and present in the db then true
			if( (curuser?.username != undefined && curuser?.password != undefined) && (curuser.username == req.query.username && curuser.password == req.query.password) ) {
			
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

					res.setHeader('Content-Type', 'text/html')
					res.write(page)
					res.end();
				});
			} else {
				res.status(405).sendFile(path.join(__dirname, '..', 'views', '405.html'))
			}
		})

		
	} else {	
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
	}

})


// router.get('/', (req, res, next) => {
// 	console.log(req.query);
	
// 	if ('username' in req.query && 'password' in req.query) {
// 		db.all("SELECT * FROM users WHERE username=$username AND password=$password", {$username: req.query.username, $password: req.query.password}, function(err, row) {
// 			let curuser = row[0];

// 			if(curuser.username == req.query.username && curuser.password == req.query.password) {
			
// 				fs.readFile(path.join(__dirname, '..', 'views', 'homePage.html'), 'utf8', (err, page) => {
// 					if (err) {
// 						console.error(err);
// 						return;
// 					}

// 					page = page.replace('{%name%}', curuser.name)
// 					page = page.replace('{%surname%}', curuser.surname)
// 					page = page.replace('{%username%}', curuser.username)
// 					page = page.replace('{%password%}', curuser.password)
// 					page = page.replace('{%description%}', curuser.description)
// 				});
// 			} else {
// 				res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
// 			}
// 		})


// 		db.all("SELECT * FROM allPosts", function(err, rows) {

// 			fs.readFile(path.join(__dirname, '..', 'views', 'homePage.html'), 'utf8', (err, page) => {
// 				if (err) {
// 					console.error(err);
// 					return;
// 				}
// 				let table_html = ''
// 				rows.forEach(
// 					el => table_html = table_html + 
// 					'<div class="container">' +
// 					'<div class="container" id="container2">' +
// 						'<div class="col-sm-12 col-md-8 col-lg-8" style= "padding:3%;">' +
// 							'<div class="">' +
// 								'<h2 style="color:black !important">' + el['username'] + '</h2>' +
// 								'<p style="color:black !important">' + el['posts'] +  '</p>' +
// 								'<button class="button">' +
// 									'<a href="">like</a>' +
// 								'</button>' +
// 								'<button class="button">' +
// 									'<a href="">dislike</a>' +
// 								'</button>' +
// 							'</div>' +
// 						'</div>' +
// 					'</div>'
// 				);
// 				page = page.replace('{%feed%}', table_html);
// 				res.write(page);
					
// 				res.end();
// 			});
				
// 		});
// 	} else {	
// 		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
// 	}

// })


router.post('/newPost', urlencodedParser, (req, res) => {
	console.log(req.query);
	// var text = req.body.posts;
	var username = req.body.textArea;
	console.log(username);
	var text = req.body.text;

	db.all("INSERT INTO allPosts (username, posts) VALUES (?,?)", [username, text], function(err, rows) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('back');
	})
})

// delette user - by Felix
router.get('/delete', (req, res, next) => {
	console.log(req.query);
		var username = req.query.username; // here reads the href

		db.all("DELETE FROM allPosts where username = ?",[username], function(err, rows) { // deletes row with user in user table
			if (err) {
				console.error(err);
				return;
			}
		})

		db.all("DELETE FROM users where username = ?",[username], function(err, rows) { // deletes row with user in user table
			if (err) {
				console.error(err);
				return;
			}
		})

		res.redirect("/login");
})

module.exports = router; 
