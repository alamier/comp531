const md5 = require('md5')
const Users = []
// const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'

//Oauth
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

var config = {
	facebook: {
		clientID: '1832995303612367',
    	clientSecret: '4f928d91a06581309a645f25811ba7a3',
    	callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
}


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

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile)
    })
  }
));

module.exports = app => {
	// app.use(cookieParser)
	app.use(passport.initialize());
	app.use(passport.session());
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', logout)
	app.put('/password', putPassword)
	app.get('/auth/facebook',passport.authenticate('facebook'),function(req, res){})
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/failure'}),
		function(req, res){res.redirect('/success')})
	app.get('/failure', function(req, res){res.status(200).send('Authentication failed!')})
	app.get('/success', function(req, res){res.status(200).send('Authentication success!')})
}