const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const HttpError = require('./models/http-errors')
const User = require('./routes/user.routes')
const Order = require('./routes/order.routes')
const OrderLists = require('./routes/order-lists.routes')
const Inventory = require('./routes/inventory.routes')
const Policy = require('./routes/policy.routes')
const Payment = require('./routes/payment.routes')

require('dotenv').config()

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
app.use(cors())

app.use('/user', User)
app.use('/order', Order)
app.use('/orderLists', OrderLists)
app.use('/inventory', Inventory)
app.use('/policy', Policy)
app.use('/payment', Payment)

app.use(() => {
  throw new HttpError('Could not find this route.', 404)
})

const uri = process.env.ATLAS_URI
const port = process.env.PORT
const dbName = process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: dbName
}

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(port)
    console.log(`Server is running on port: ${port}`)
  })
  .catch((error) => {
    console.log(error)
  })
