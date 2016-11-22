var models = require('./model.js')
var Article = models.Article
// var Comment = models.Comment
const md5 = require('md5')


const addArticle = (req, res) => {
     console.log('[addArticle]Payload received: ', req.body)
     newArticle = new Article({
        author: req.username,
        text: req.body.text,
        date: new Date(),
        comments:[]
     })
     newArticle.save((err, newArticle) => {
        if(err){
            console.log("[addArticle] Error " + err)
            res.status(401).send(err)
        }else{
            var article = {
                author:newArticle.author,
                text:newArticle.text,
                date:newArticle.date,
                comments:newArticle.comments
            }
            res.status(200).send({articles:[article]})
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
        Article.find({}, (err, articles) => {
            if(err){
                console.log("[getArticles] " + err)
                res.status(400).send(err)
            }else{
                res.status(200).send({
                    articles:articles
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
                // const newComment = new Comment({
                //     commentId:commentId,
                //     author: req.username,
                //     text: req.body.text,
                //     date: new Date()
                // })
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
                // Comment.findOne({commentId:req.body.commentId}, (err, comment) => {
                //     if(err){
                //         console.log("[updateArticle] " + err)
                //         res.status(400).send(err)
                //     }else{
                //         if(!comment){
                //             res.status(400).send("No comment of this id found!")
                //             return
                //         }
                //         if(comment.author !== req.username){
                //             res.status(401).send("You are not the author!")
                //             return
                //         }else{
                //             Comment.findOneAndUpdate({commentId:req.body.commentId},
                //                 {$set:{text: req.body.text}},{new:true}, (err,comment) => {
                //                     if(err){
                //                         console.log("[updateArticle] " + err)
                //                         res.status(400).send(err)
                //                     }else{
                //                         Article.findById(req.params.id, (err,article) => {
                //                             if(err){
                //                                 console.log("[updateArticle] " + err)
                //                                 res.status(400).send(err)
                //                             }else{
                //                                 res.status(200).send({articles:[article]})
                //                             }
                //                         })
                //                     }
                //             })
                //         }
                //     }
                // })
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
     app.post('/article', addArticle)
     app.get('/articles/:id?', getArticles)
     app.put('/articles/:id', updateArticle)
}