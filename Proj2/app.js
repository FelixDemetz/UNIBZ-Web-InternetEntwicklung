const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const homeRoutes = require('./routes/homePage')
const teamRoutes = require('./routes/teamPage')
const landingRoutes = require('./routes/landingPage')
const loginRoutes = require('./routes/loginPage')
const indexRoutes = require('./routes/index')
const detailRoutes = require('./routes/book')

const { allowedNodeEnvironmentFlags } = require('process')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./books.sqlite');

const app = express()

	
app.use(bodyParser.urlencoded({extended: true}))
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