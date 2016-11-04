const md5 = require('md5')
const Crypto = require('crypto')
const Users = []
const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'

const generateSalt = () => {
	return Crypto.randomBytes(16).toString('base64')
}

const register = (req, res) => {
	var username = req.body.username
	var password = req.body.password

	if(!username || !password){
		res.sendStatus(401).send("Missing username or password!")
		return
	}else{
		salt = generateSalt()
		hash = md5(password + salt)
		Users.push({username:username, salt:salt, hash:hash})
		res.send({username: username, salt:salt, hash:hash})
	}
}

const isAuthorized = (password, salt, hash) => {
	return md5(password + salt) === hash
}

const generateCode = (obj) => {
	return md5(JSON.stringify(obj))
}

const login = (req,res) => {
	var username = req.body.username
	var password = req.body.password
		if(!username || !password){
		res.sendStatus(401).send("Missing username or password!")
		return
	}else{
		var userObj = Users.filter( u => {return r.username === username})[0]
		if(!userObj){
			res.sendStatus(401).send("User doesn't exist!")
			return
		}
		if(!isAuthorized(userObj.password,userObj.salt,userObj.hash)){
			res.sendStatus(401).send("Incorrect username or password!")
			return
		}

		res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true})
		const msg = {username: username, result: "success"}
		res.send(msg)
	}
}

module.exports = app => {
	app.use(cookieParser)
	app.post('/register', register)
	app.post('/login', login)
}