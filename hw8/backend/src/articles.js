const uploadImage = require('./uploadCloudinary')
var models = require('./model.js')
var Article = models.Article
var Profile = models.Profile

const md5 = require('md5')


const addArticle = (req, res) => {
     console.log('[addArticle]Payload received: ', req.body)
     newArticle = new Article({
        author: req.username,
        text: req.body.text,
        date: new Date(),
        img: req.fileurl,
        comments:[]
     })
     newArticle.save((err, newArticle) => {
        if(err){
            console.log("[addArticle] Error " + err)
            res.status(401).send(err)
        }else{
            // var article = {
            //     author:newArticle.author,
            //     text:newArticle.text,
            //     date:newArticle.date,
            //     comments:newArticle.comments,
            //     img: req.fileurl
            // }
            res.status(200).send({articles:[newArticle]})
        }
     })
}

const getArticles = (req, res) => {
    if(req.params.id) {
        Article.find({_id:req.params.id}, (err,articles) => {
            if(err){
                console.log("[getArticles] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({
                    articles:articles
                })
            }
        })
    }else{
        //limit to ten articles
        Profile.findOne({username:req.username}, (err,profile) => {
            if(err){
                console.log("[getArticles without id] " + err)
                res.status(400).send(err)
            }else{
                const usersToQuery = [profile.username, ...profile.following]
                Article.find({author:{$in: usersToQuery}})
                .sort({'date': -1})
                .limit(10)
                .exec((err, articles) => {
                    if(err){
                        console.log("[getArticles without id] " + err)
                        res.status(400).send(err)
                    }else{
                        res.status(200).send({
                            articles:articles
                        })
                    }
                })
            }
        })
    }
}

const updateArticle = (req, res) => {
    if(!req.params.id){
        res.status(400).send("id not found!")
    }else{
        if(req.body.commentId){
            // new comment
            if(req.body.commentId === -1){
                console.log("[updateArticle] create new comment")
                var commentId = md5(req.username + new Date().getTime())
                const newComment = {
                    commentId:commentId,
                    author: req.username,
                    text: req.body.text,
                    date: new Date()
                }

                Article.findByIdAndUpdate(req.params.id,
                    {$addToSet: {comments:newComment}},{new:true},(err, article) => {
                            if(err){
                                console.log("[updateArticle] " + err)
                                res.status(400).send(err)
                            }else{
                                res.status(200).send({articles:[article]})
                            }
                    })
            }else{
                console.log("[updateArticle] update a comment")
                Article.findById(req.params.id,(err, article) => {
                    if(err){
                        console.log("[updateArticle] " + err)
                        res.status(400).send(err)
                    }else{
                        var newComments = article.comments.map((comment) => {
                            if(comment.commentId === req.body.commentId){
                                return {
                                    commentId:comment.commentId,
                                    author:comment.author,
                                    text:req.body.text,
                                    date:comment.date
                                }
                            }else{
                                return comment
                            }
                        })
                        console.log("[updateArticle] newComments: " + newComments)
                        Article.update({_id:req.params.id},{comments:newComments},(err,count) => {
                            if(err){
                                console.log("[updateArticle] " + err)
                                res.status(400).send(err)
                            }
                        })
                        res.status(200).send({articles:[article]})
                    }
                })
            }
        }else{
            Article.findById(req.params.id,(err, article) => {
                if(err){
                    console.log("[updateArticle] " + err)
                    res.status(400).send(err)
                }else if(article.author !== req.username){
                    res.status(401).send("You are not the author!")
                    return
                }else{
                    Article.findByIdAndUpdate(req.params.id,{text:req.body.text},{new:true},
                        (err,article) => {
                            if(err){
                                console.log("[updateArticle] " + err)
                                res.status(400).send(err)
                            }else{
                                res.status(200).send({articles:[article]})
                            }
                        })
                }
            })
        }
    }
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.post('/article', uploadImage('articleImg'), addArticle)
     app.get('/articles/:id?', getArticles)
     app.put('/articles/:id', updateArticle)
}