const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const port = 3001

server.use(middlewares)

// Custom middleware for anecdote validation
server.use('/anecdotes', (req, res, next) => {
  if (req.method === 'POST') {
    const { content } = req.body
    if (!content || content.length < 5) {
      return res.status(400).json({ 
        error: 'too short anecdote, must have length 5 or more' 
      })
    }
  }
  next()
})

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
