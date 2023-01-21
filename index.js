console.clear()
const express = require('express')
const app = express()
require('./scripts/colors')
const port = 5001

app.listen(port, () => {
  console.log(`Server started on port ${port}`.success);
})