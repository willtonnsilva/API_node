const server = require('./server')

const port = process.env.PORT

server.listen(3001, function () {
  console.log('servidor em pé na porta, ', port || 3001)
})
