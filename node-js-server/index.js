const { promisify } = require('util')
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');
var server, app;

app = server = restify.createServer()
var cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*'], // Should whitelist actual domains in production
  allowHeaders: ['Authorization', 'API-Token', 'Content-Range'], //Content-range has size info on lists
  exposeHeaders: ['Authorization', 'API-Token-Expiry', 'Content-Range']
})
server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser()); //{mapParams: true}
server.use(restify.plugins.bodyParser());  //{mapParams: true, mapFiles: true}
server.use(restify.plugins.acceptParser(server.acceptable));

const initializeDatabase = require('./app/databse')

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3000
    await initializeDatabase(app)
    await promisify(app.listen).bind(app)(port)
    console.log(`Listening on port ${port}`)
}

startServer()