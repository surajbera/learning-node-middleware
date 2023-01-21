console.clear()
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()
require('./scripts/colors')
const port = 5001

/* Built in middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))



/* Application Level Middleware */
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
  next()
}
app.use(loggerMiddleware)



/* Router Level Middleware */
const fakeAuth = (req, res, next) => {
  const authStatus = true
  if (authStatus) {
    console.log('User AuthStatus: ', authStatus)
    next()
  } else {
    res.status(401)
    throw new Error('User not authorized')
  }
}
const getUsers = (req, res) => {
  res.json({ message: 'Get All Users' })
}
const createUser = (req, res) => {
  // console.log(`This is the request body recieved from client: ${req.body}`); This logs [object object]
  console.log('This is the request body recieved from client: ', req.body);
  res.json({ message: 'Create New User' })
}
router.use(fakeAuth)
router.route('/').get(getUsers).post(createUser)
app.use('/api/users', router)



/* Error Handler Middleware */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case 401:
      res.json({
        title: 'Unauthorized',
        message: err.message
      })
      break

    case 404:
      res.json({
        title: 'Not Found',
        message: err.message
      })
      break

    case 500:
      res.json({
        title: 'Server Error',
        message: err.message
      })
      break

    default:
      break
  }
}

app.use('*', (req, res) => {
  res.status(404)
  throw new Error('Route not found')
})
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server started on port ${port}`.success);
})