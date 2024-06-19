const logEvents = require('./logEvents')
const EventEmiter = require('events')

class MyEmitter extends EventEmiter {}

// init object

const myEmitter = new MyEmitter()

// add listener

myEmitter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
  // Emit event
  myEmitter.emit('log', 'Log event emitted')
}, 2000)
