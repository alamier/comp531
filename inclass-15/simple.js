var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload = {}

     switch (req.url) {
          case '/':
               payload.hello = 'worlds'
               break
          case '/articles':
               payload = {articles:[
                         {id:1, author:'scott', body:'A post'},
                         {id:1, author:'zhou', body:'A post'},
                         {id:1, author:'liu', body:'A post'}
                    ]}
               break
          case '/login':
               if(req.method === 'POST') {
                    let json = JSON.parse(req.body)
                    payload.username = json.username
                    payload.result = 'success'
               }
               break
          case '/logout':
               if (req.method === 'PUT') {
                    payload = 'OK'
               }
               break
          default:
               payload = "undefined url"

     }
     
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
