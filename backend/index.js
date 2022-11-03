const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(cors()) //we can fetch directly from client side whith help of cors;
app.use(express.json())

// Available Routes
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})