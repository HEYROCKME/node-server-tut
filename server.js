const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmiter = require('events')

class Emitter extends EventEmiter {}

// init object

const myEmitter = new Emitter()

const PORT = process.env.PORT || 3500

// Create a server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  const extension = path.extname(req.url)

  // Setting the Content Type
  let contentType

  switch (extension) {
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.jpg':
      contentType = 'image/jpeg'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.txt':
      contentType = 'text/plain'
      break

    default:
      contentType = 'text/html'
  }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// add listener
// myEmitter.on('log', (msg) => logEvents(msg))

// Emit event
//  myEmitter.emit('log', 'Log event emitted')
