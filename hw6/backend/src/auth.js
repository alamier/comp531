const md5 = require('md5')
const Users = []
// const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'

const generateSalt = () => {
	return Math.floor(Math.random() * 10)
}

const register = (req, res) => {
	console.log('before register:' + Users)
	var username = req.body.username
	var password = req.body.password

	if(!username || !password){
		res.sendStatus(401).send("Missing username or password!")
		return
	}else{
		salt = generateSalt()
		hash = md5(password + salt)
		Users.push({username:username, salt:salt, hash:hash})
		res.status(200).send({username: username, salt:salt, hash:hash})
	}
	console.log('after register:' + Users)
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
	console.log("login with username: " + username + ", password: " + password)
	if(!username || !password){
		res.status(401).send("Missing username or password!")
		return
	}else{
		var userObj = Users.filter( r => {return r.username === username})[0]
		if(!userObj){
			res.status(401).send("User doesn't exist!")
			return
		}
		if(!isAuthorized(password,userObj.salt,userObj.hash)){
			res.status(401).send("Incorrect username or password!")
			return
		}

		res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true})
		const msg = {username: username, result: "success"}
		res.status(200).send(msg)
	}
}

const logout = (req,res) => {
	res.status(200).send('OK');
}

const putPassword = (req, res) => {
	const password = req.body.password;
	if(!password) {
		res.status(400).send({result:"Invalid password!"})
	}
	res.status(200).send({
		username:'zl48',
		status:'will not change'
	})
}

module.exports = app => {
	// app.use(cookieParser)
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', logout)
	app.put('/password', putPassword)
}