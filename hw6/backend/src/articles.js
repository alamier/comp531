var articles = [
    {
        id: 1,
        author: "Scott",
        text: "Article 1",
        date: new Date(),
        comments:["comment1"]
    },
    {
        id: 2,
        author: "Zhou",
        text: "Article 2",
        date: new Date(),
        comments:["comment1"]
    },
    {
        id: 3,
        author: "Liu",
        text: "Article 3",
        date: new Date(),
        comments:["comment1"]
    }
]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     article = {
        id: articles.length + 1,
        author: "zl48",
        text: req.body.text,
        date: new Date(),
        comments:[]
     }
     articles.push(article)  
     res.status(200).send({articles:[article]})
}

const getArticles = (req, res) => {
    console.log("getArticles")
    res.status(200).send({articles:articles})
}

const getArticlesById = (req, res) =>  {
    var id = req.params.id
    var article = articles.filter((article) => {
        return article.id == id
    })
    if(article.length !== 0){
        res.status(200).send({articles:article})
    } else {
        res.status(200).send({articles:[]})
    }
}

const putArticles = (req, res) => {
    const text = req.body.text
    if(req.params.id > articles.length){
        res.status(401).send("ID not found!")
        return
    }
    if(!req.body.commentId){
        articles[req.params.id - 1].text = req.body.text;
    }
    else{
        articles[req.params.id].comments.append({commentId:req.body.commentId, text: req.body.text})
    }
    res.status(200).send({articles: [articles[req.params.id - 1]]});
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.post('/article', addArticle)
     app.get('/articles', getArticles)
     app.get('/articles/:id', getArticlesById)
     app.put('/articles/:id', putArticles)
}