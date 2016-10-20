
const index = (req, res) => {
	console.log(req.params.user)
    res.send({ hello: 'world' })
}

const putHeadLine = (req, res) => {
	res.send({
		headlines:[{
			username:'zhou',
			headline:req.body.headline || 'you did not supply it'
		}]
	})
}

const getHeadlines = (req, res) => {
	res.send({
		username:req.params.user,
		headline:"a headline"
	})
}

const getEmail = (req, res) => {
	res.send({
		username:req.params.user,
		email:"zl48@rice.edu"
	})
}

const putEmail = (req, res) => {
	res.send({
		emails:[{
			username:'zhou',
			email:req.body.email || 'you did not supply it'
		}]
	})
}

const getZipcode = (req, res) => {
	res.send({
		username:req.params.user,
		zipcode:"77030"
	})
}

const putZipcode = (req, res) => {
	res.send({
		zipcodes:[{
			username:'zhou',
			zipcode:req.body.zipcode || 'you did not supply it'
		}]
	})
}

const getAvatar = (req, res) => {
	res.send({
		username:req.params.user,
		avatar:"avatar"
	})
}

const putAvatar = (req, res) => {
	res.send({
		avatars:[{
			username:'zhou',
			avatar:req.body.avatar || 'you did not supply it'
		}]
	})
}

module.exports = app => {
     app.get('/:user', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadLine)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', putAvatar)
}
