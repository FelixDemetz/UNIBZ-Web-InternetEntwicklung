const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const teamRoutes = require('./routes/teamPage')
const landingRoutes = require('./routes/landingPage')
const { allowedNodeEnvironmentFlags } = require('process')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./books.sqlite');

const app = express()

	
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.use("/styles/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.use('/team', teamRoutes)
app.use(landingRoutes)

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(8000) 