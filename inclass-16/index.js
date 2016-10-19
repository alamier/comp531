
const express = require('express')
const bodyParser = require('body-parser')

var id = 4;

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const newArticle = {
     	id:id++,
     	author:'zhou',
     	text:req.body.body
     }
     articles.articles.push(newArticle)    
     res.send(newArticle)
}

var articles = {articles:[
                         {id:1, author:'scott', text:'A post'},
                         {id:2, author:'zhou', text:'A post'},
                         {id:3, author:'liu', text:'A post'}
                    ]}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticle = (req, res) => res.send(articles)

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
