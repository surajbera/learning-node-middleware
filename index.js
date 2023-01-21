console.clear()
const express = require('express')
const app = express()
require('./scripts/colors')
const port = 5001

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
    throw new Error('User is not authorized')
  }
}
const getUsers = (req, res) => {
  res.json({ message: 'Get All Users' })
}
const createUser = (req, res) => {
  res.json({ message: 'Create New User' })
}
router.use(fakeAuth)
router.route('/').get(getUsers).post(createUser)
app.use('/api/users', router)



app.listen(port, () => {
  console.log(`Server started on port ${port}`.success);
})