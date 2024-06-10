const cors = require("cors");
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const db=require("./db.json");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const auth = require('json-server-auth');

server.use(cors());
server.use(middlewares);
server.db = router.db;
server.use(auth);
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
});

// Export the Server API
module.exports = server