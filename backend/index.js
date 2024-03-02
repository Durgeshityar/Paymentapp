const express = require('express')
const rootRouter = require('./routes/indexRoutes')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
