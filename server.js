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

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8')
    response.writeHead(200, { ContentType: contentType })
    response.end(data)
  } catch (err) {
    console.error(err)
    response.stausCode = 500
    response.end()
  }
}

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
  // set file path according to url and content type
  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url)
      : path.join(__dirname, req.url)

  // Makes the .html not required in the browser
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

  // Check if file exists
  const fileExists = fs.existsSync(filePath)

  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res)
  } else {
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { location: '/new-page.html' })
        res.end()
        break
      case 'www-page.html':
        res.writeHead(301, { location: '/' })
        res.end()
        break

      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
      //   break;
    }
    // 404
    // 301 redirect
    // console.log(path.parse(filePath))
  }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// add listener
// myEmitter.on('log', (msg) => logEvents(msg))

// Emit event
//  myEmitter.emit('log', 'Log event emitted')
