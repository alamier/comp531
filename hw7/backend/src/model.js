var mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI)

var userSchema = new mongoose.Schema({
	username: String,
    salt: String,
    hash: String
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
// exports.Comment = mongoose.model('Comment', commentSchema)