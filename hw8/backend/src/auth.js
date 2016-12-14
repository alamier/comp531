const md5 = require('md5')
var models = require('./model.js')
var User = models.User
var Profile = models.Profile
const crypto = require('crypto')
const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'
const defaultStatus = "This is the default status"
const defaultAvatar = 'http://img.thehobbyblogger.com/2012/08/custom-avatar.png'
const session = require('express-session')

// const FacebookAuthConfig = {
//   clientID: '1832995303612367',
//   clientSecret: '4f928d91a06581309a645f25811ba7a3',
//   // callbackURL: 'https://zl48finalserver.herokuapp.com/auth/facebook/callback',
//   callbackURL: 'http://localhost:3000/auth/facebook/callback',
//   passReqToCallback: true
//   }

  const FacebookAuthConfig = {
  clientID: '1296722057014818',
  clientSecret: 'a069709b351ae5c10dce6c6e4c47deb3',
  callbackURL: 'https://zl48finalserver.herokuapp.com/auth/facebook/callback',
  // callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true,
  }

var frontendUrl = '';

//store frontend url
const getFrontendUrl = (req, res, next) => {
	if(frontendUrl === ''){
		frontendUrl = req.headers.referer
	}
	next()
}

//Oauth
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

if (!process.env.REDIS_URL) {
	console.log("No REDIS_URL FOUND!")
     process.env.REDIS_URL="redis://h:p8ltru3oldn6uu6ffbur6dnctvr@ec2-54-221-211-164.compute-1.amazonaws.com:22209"
}
var redis = require('redis').createClient(process.env.REDIS_URL)


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

// serialize and deserialize
passport.serializeUser(function(user, done){
	console.log("[serializeUser] user.id:" + user.id)
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	console.log("[deserializeUser] authId:" + id)
	User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})

const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		console.log('[isLoggedIn] req.user.username: ' + req.user.username)
		const usrArr = req.user.username.split('@');
		const authObj = {}
		authObj[`${usrArr[1]}`] = usrArr[0]
		User.findOne({auth: authObj}).exec(function(err,user) {
			if(!user){
				req.username = req.user.username
			} else {
				req.username = user.username
			}
			return next()
		})
	}
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
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		//corner case for link acount
		if(req.cookies[cookieKey] !== undefined){
			const sid = req.cookies[cookieKey]
			redis.del(sid)
			res.clearCookie(cookieKey)
		}
		res.status(200).send("OK")
	} else{
		var sid = req.cookies[cookieKey]
		console.log("[logout] delete sid: " + sid)
		redis.del(sid)
		res.clearCookie(cookieKey)

		res.status(200).send('OK');
	}
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

// config
// passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: config.facebook.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       return done(null, profile)
//     })
//   }
// ));
passport.use(new FacebookStrategy(FacebookAuthConfig, function(req, token, refreshToken, profile, done){
	console.log("[passport.use(new FacebookStrategy)] profile: " + JSON.stringify(profile))
	console.log("[passport.use(new FacebookStrategy)] req: " + JSON.stringify(req.cookies))
	const username = profile.displayName + '@' + profile.provider
	const sid = req.cookies[cookieKey]
	console.log("[passport.use(new FacebookStrategy)] sid: " + sid)
	if(!sid){
		User.findOne({username: username}).exec((err, user) => {
			if(err) {
				console.log("[User.findOne] " + err)
				return done(null, profile)
			}
			if(!user){
				console.log("-------------")
				const newUserObj = new User({
					username: username,
					authId: profile.id
				})
				new User(newUserObj).save((err, user) => {
					if(err) return console.log("[newUserObj.save] " + err)
				})

				const newProfileObj = new Profile({
					username: username,
					status: "I am from Facebook!",
					follwoing: [],
					email: null,
					dob: new Date(2016,12,12).getTime(),
					zipcode: null,
					avatar: "https://www.facebook.com/images/fb_icon_325x325.png"
				})
				newProfileObj.save((err, profile) => {
					if(err) return console.log("[newProfileObj.save] " + err)
				})

				return done(null, profile)
			}
		})
	}else{
		redis.hgetall(sid, function(err, userObj) {
				const localUser = userObj.username
				Article.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
				Article.update({'comments.author' : username}, { $set: {'comments.$.author': localUser}}, { new: true, multi: true }, function(){})
				Comment.update({author:username}, { $set: { 'author': localUser}}, { new: true, multi: true }, function(){})
				Profile.findOne({username: username}).exec(function(err, profileData){
					if(profileData){
						const oldFollowingArr = profileData.following
						Profile.findOne({username: localUser}).exec(function(err, newProfile) {
							if(newProfile){
								//concat
								const newFollowingArr = newProfile.following.concat(oldFollowingArr)
								Profile.update({username: localUser}, {$set: {'following': newFollowingArr}}, function(){})
							}
						})
						//delete the profile record
						Profile.update({username: username}, {$set: {'following':[]}}, function(){})
					}
				})
				User.findOne({username: localUser}).exec(function(err, user){
					if(user){
						let authObj = {}
						authObj[`${profile.provider}`] = profile.displayName
						User.update({username: localUser}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
					}
				})
			})
		return done(null, profile)
	}
}))

//successful callback
const successCallback = (req, res,next) => {
	console.log("redirect to" + frontendUrl)
	res.redirect(frontendUrl)
	next()
}

//errorCallback 
const errorCallback = (err,req,res,next) => {
	if(err){
		res.status(400).send({err:err.message})
	}
	next()
}

// merge accounts
const merge = (req, res) => {
	const username = req.body.regUsername;
	const password = req.body.regPassword;
	if (!username || !password) {
		res.status(400).send("username or password is missing")
		return
	}
	User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0){
            res.sendStatus(400)
            return
        }
        const userObj = users[0]
		if(!userObj){
			res.status(400).send("Don't have this user in db")
		}
		const salt = userObj.salt;
		const hash = userObj.hash;

		if(md5(password + salt) === hash){
			//third party username
			Article.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true}, function(){})
			Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true, multi: true }, function(){})
			Comment.update({author:req.username}, { $set: { 'author': username}}, { new: true, multi: true }, function(){})
			Profile.findOne({username: req.username}).exec(function(err, profile){
				if(profile){
					const oldFollowingArr = profile.following
					Profile.findOne({username: username}).exec(function(err, newProfile) {
						if(newProfile){
							//concat
							const newFollowingArr = newProfile.following.concat(oldFollowingArr)
							Profile.update({username: username}, {$set: {'following': newFollowingArr}}, function(){})
						}
					})
					//delete the profile record
					Profile.update({username: req.username}, {$set: {'following':[]}}, function(){})
				}
			})
			User.findOne({username: username}).exec(function(err, user){
				if(user){
					const usrArr = req.username.split('@');
					const authObj = {}
					authObj[`${usrArr[1]}`] = usrArr[0]
					User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
				}
			})
			res.status(200).send({ username: username, result: 'success'})
		} else{
			res.status(401).send("incorrect password!")
		}
	})
}

// unlink accounts
const unlink = (req, res) => {
	const username = req.username
	const company = req.body.company
	User.findOne({username: username}).exec(function(err, user){
		if(user.auth.length !== 0){
			User.findOne({username: username}).exec(function(err,user){
				let authArr = user.auth
				authArr = authArr.filter(function (obj) {
					return Object.keys(obj)[0] !== company;
				})
				User.update({username: username}, {$set: {'auth': authArr}}, {new: true}, function(){})
				res.status(200).send({result: 'successfully unlink ' + company})
			})
		} else {
			res.status(400).send("no link account")
		}
	})
}

module.exports = app => {
	app.use(cookieParser())
	app.use(getFrontendUrl)
	app.use(session({secret:'zl48secret',resave:false, saveUninitialized:false}))
	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/login/facebook',passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}),successCallback, errorCallback)

	app.post('/register', register)
	app.post('/login', login)

	app.put('/logout', isLoggedIn, logout)
	app.put('/password', isLoggedIn, putPassword)
	//put auth.js before other js files in the index.js file
	//to ensure that isLoggedIn is applied to all other routes
	app.use(isLoggedIn)

	// link accounts
	app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}))

	app.post('/unlink', unlink)
	app.post('/merge', merge)
}