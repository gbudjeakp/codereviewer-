const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000 || process.env.PORT


app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
