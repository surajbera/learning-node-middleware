console.clear()
const express = require('express')
const router = express.Router()
const app = express()
require('./scripts/colors')
const port = 5001

/* Application Level Middleware */
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
  next()
}

app.use(loggerMiddleware)

app.listen(port, () => {
  console.log(`Server started on port ${port}`.success);
})