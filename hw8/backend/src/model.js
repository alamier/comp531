var mongoose = require('mongoose')
if(!process.env.MONGOLAB_URI){
    console.log("no MONGOLAB_URI found!")
}
mongoose.connect(process.env.MONGOLAB_URI)

var userSchema = new mongoose.Schema({
	username: String,
    salt: String,
    hash: String,
    auth:[],
    authId: String
})

var profileSchema = new mongoose.Schema({
	username: String,
	status: String,
	following:[String],
	email: String,
	dob: Date,
	zipcode: String,
	avatar: String
})

var articleSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: String,
        author: String,
        text: String,
        date: Date
    }]
})

exports.User = mongoose.model('User', userSchema)
exports.Profile = mongoose.model('Profile', profileSchema)
exports.Article = mongoose.model('Article', articleSchema)