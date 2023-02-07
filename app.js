require('dotenv').config()
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
// connect db
const connectDb = require('./db/connect')
// routers
const authRoute = require('./routes/auth.route')
const stringRoute = require('./routes/string.route')
const topperRoute = require('./routes/topper.route')

app.use(express.static('./static', { extensions: ['html', 'htm'] }))
app.use(express.static('./public'))
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}))
app.set('trust proxy', 1)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  }),
)
app.use(express.json())
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use(authRoute)
app.use(stringRoute)
app.use(topperRoute)

app.get('/',(req,res)=>{
  res.status(200).send('this is backend of bgps')
})
app.get('/health',async(req,res)=>{
  const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }
  res.status(200).json(healthcheck)
})

const port = process.env.PORT || 8080

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()