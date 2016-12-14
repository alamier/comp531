const express = require('express')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== "production") {
    require('dotenv').load()
}

const hello = (req, res) => res.send({ hello: 'world' })

const middlewareCORS = (req, res, next) => {
	console.log("[CORS] origin: " + req.headers.origin)
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, X-Session-Id')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')

    if(req.method == 'OPTIONS') {
    	res.status(200).send("OK")
    }else{
    	next()
    }
}

const middlewareDebug = (req, res, next) => {
	console.log("url " + req.url)
	console.log("method " + req.method)
	console.log("body: " + JSON.stringify(req.body))
	next()
}

const app = express()
app.use(bodyParser.json())
app.use(middlewareCORS)
app.use(middlewareDebug)


app.get('/',hello)

console.log(process.env.NODE_ENV)

require('./src/auth')(app)
require('./src/articles')(app)
require('./src/following')(app)
require('./src/profile')(app)
// require('./src/uploadCloudinary.js').setup(app)
require('./src/uploadCloudinary.js')


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
