const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const homeRoutes = require('./routes/homePage.js')
const teamRoutes = require('./routes/teamPage.js')
const landingRoutes = require('./routes/landingPage.js')
const loginRoutes = require('./routes/loginPage.js')
const indexRoutes = require('./routes/index.js')
const detailRoutes = require('./routes/book.js')

const { allowedNodeEnvironmentFlags } = require('process')

sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Users.sqlite");

const app = express()

	
app.use(bodyParser.json())
app.use(express.static('public'));
app.use("/styles/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.use("/homePage", homeRoutes )
app.use('/team', teamRoutes)

app.use('/login', loginRoutes)
app.use("/index", indexRoutes )
app.use('/book', detailRoutes)
app.use(landingRoutes)

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(8000) 