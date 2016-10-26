var articles = [
    {
        id: 0,
        author: "Scott",
        body: "Article 1"
    },
    {
        id: 1,
        author: "Zhou",
        body: "Article 2"
    },
    {
        id: 2,
        author: "Liu",
        body: "Article 3"
    }
]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     article = {
        id: articles.length,
        author: req.body.author,
        body: req.body.body
     }
     articles.push(article)  
     res.send(JSON.stringify(article))
}

const getArticles = (req, res) => res.send(JSON.stringify(articles))

const getArticlesById = (req, res) =>  {
    var id = req.params.id
    res.send(JSON.stringify(articles.filter((article) => {
    return article.id == id
    })))
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.post('/article', addArticle)
     app.get('/articles', getArticles)
     app.get('/articles/:id', getArticlesById)
}