import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './Routes/posts.js'

const app = express()
const port = 5000 || process.env.PORT


app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.use('/posts', postRoutes)

// This line underneath sets up the database connection
const uri = 'mongodb://localhost:27017/codereview'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
