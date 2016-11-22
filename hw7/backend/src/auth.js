const md5 = require('md5')
var models = require('./model.js')
var User = models.User
var Profile = models.Profile
const crypto = require('crypto')
const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'
const defaultStatus = "This is the default status"
const defaultAvatar = 'http://img.thehobbyblogger.com/2012/08/custom-avatar.png'

//Oauth
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

if (!process.env.REDIS_URL) {
     process.env.REDIS_URL="redis://h:p8ltru3oldn6uu6ffbur6dnctvr@ec2-54-221-211-164.compute-1.amazonaws.com:22209"
}
var redis = require('redis').createClient(process.env.REDIS_URL)

var config = {
	facebook: {
		clientID: '1832995303612367',
    	clientSecret: '4f928d91a06581309a645f25811ba7a3',
    	callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
}


const generateSalt = () => {
	// return Math.floor(Math.random() * 1000000)
	return crypto.randomBytes(128).toString('base64');
}

const register = (req, res) => {
	// console.log('before register:' + Users)
	var username = req.body.username
	var password = req.body.password

	User.findOne({'username':username}, (err, doc) => {
		if(err) {
			console.log(err);
			res.status(401).send(err)
		}else if(doc){
			console.log(doc)
			console.log("username already exist!")
			res.status(401).send("username already exist!")
		}else{
			if(!username || !password){
				res.status(401).send("Missing username or password!")
				return
			}else{
				salt = generateSalt()
				hash = md5(password + salt)
				// Users.push({username:username, salt:salt, hash:hash})
				var newUser = new User({username:username, salt:salt, hash:hash})
				newUser.save((err, user) => {
					if(err) {
						console.log(err);
						res.status(401).send(err)
					}else{
						var newProfile = new Profile({
							username: username,
							status: defaultStatus,
							follwoing:[],
							email: req.body.email,
							dob: req.body.dob,
							zipcode:req.body.zipcode,
							avatar:defaultAvatar
						})
						newProfile.save((err, user)=>{
							if(err){
								console.log(err)
								res.status(401).send(err)
							}else{
								res.status(200).send({result:'success', username: username})
							}
						})
					}
				})
			}
		}
	})

	
	// console.log('after register:' + Users)
}

const isAuthorized = (password, salt, hash) => {
	return md5(password + salt) === hash
}

const generateCode = (obj) => {
	return md5(JSON.stringify(obj) + new Date().getTime())
}

const login = (req,res) => {
	var username = req.body.username
	var password = req.body.password
	console.log("login with username: " + username + ", password: " + password)
	if(!username || !password){
		res.status(401).send("Missing username or password!")
		return
	}else{
		// var userObj = Users.filter( r => {return r.username === username})[0]
		User.findOne({username:username}, (err, userObj) => {
			if(err){
				res.status(401).send(err)
			}else{
				if(!userObj){
					res.status(401).send("User doesn't exist!")
					return
				}
				console.log("[login] found user: " + userObj.username)
				if(!isAuthorized(password,userObj.salt,userObj.hash)){
					res.status(401).send("Incorrect username or password!")
					return
				}

				var sessionKey = generateCode(userObj)
				redis.set(sessionKey, JSON.stringify(userObj))
				res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
				const msg = {username: username, result: "success"}
				res.status(200).send(msg)
			}
		})
		
	}
}

const isLoggedIn = (req, res, next) => {
	console.log('[isLoggedIn] cookies: ' + JSON.stringify(req.cookies))
	var sid = req.cookies[cookieKey]
	console.log('[isLoggedIn] sid: ' + sid)
	if(!sid){
		return res.status(401).send("Sid doesn't exist in cookie!")
	}

	redis.get(sid, function(err, userObjStr) {
		if(err) console.error('[isLoggedIn] error:' + err)
		console.log("[isLoggedIn] userObjStr: " + userObjStr)
		if(userObjStr){
			var userObj = JSON.parse(userObjStr)
			console.log("[isLoggedIn]:" + sid + " mapped to " + userObj.username);
			req.username = userObj.username
			return next()
		}else{
			return res.status(401).send("user doesn't exist!")
		}
	})
}

const logout = (req,res) => {
	var sid = req.cookies[cookieKey]
	console.log("[logout] delete sid: " + sid)
	redis.del(sid)
	res.clearCookie(cookieKey)
	res.status(200).send('OK');
}

const putPassword = (req, res) => {
	const password = req.body.password;
	if(!password) {
		res.status(400).send({result:"Invalid password!"})
	}
	User.findOne({username:req.username}, (err, user) => {
		if(err){
			console.log("[putPassword]" + err)
			res.status(400).send(err)
		}else{
			if(!user){
				res.status(400).send("no user found")
			}else{
				var newSalt = generateSalt()
				var newHash = md5(password + newSalt)
				console.log("[putPassword] newSalt: " + newSalt)
				console.log("[putPassword] newHash: " + newHash)
				User.findOneAndUpdate({username:req.username},
				{salt:newSalt,hash:newHash},{new:true},(err, user) => {
					if(err){
						console.log("[putPassword]" + err)
						res.status(400).send(err)
					}else{
						res.status(200).send({username:user.username,status:"success"})
					}
				})
			}
		}
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
	app.use(cookieParser())
	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/auth/facebook',passport.authenticate('facebook'),function(req, res){})
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/failure'}),
		function(req, res){res.redirect('/success')})
	app.get('/failure', function(req, res){res.status(200).send('Authentication failed!')})
	app.get('/success', function(req, res){res.status(200).send('Authentication success!')})

	app.post('/register', register)
	app.post('/login', login)

	app.put('/logout', isLoggedIn, logout)
	app.put('/password', isLoggedIn, putPassword)
	//put auth.js before other js files in the index.js file
	//to ensure that isLoggedIn is applied to all other routes
	app.use(isLoggedIn)
}