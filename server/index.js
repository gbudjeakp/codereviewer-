import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './Routes/posts.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '20mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the Experience API')
})

// This line underneath sets up the database connection
// const uri = process.env.MONGO_URL
const uri = 'mongodb+srv://admin-baz:sweetcaroline@cluster0.a17sv.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
