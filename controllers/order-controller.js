const HttpError = require('../models/http-errors')
const Orders = require('../models/order.model')

const createOrders = async (req, res, next) => {
  const {
    purchaseDate,
    requestedDate,
    siteName,
    siteManager,
    supplierName,
    itemId,
    itemName,
    itemQuantity,
    totPrice,
    isRestricted,
    deliveryNote,
    status
  } = req.body

  const OrdersItem = new Orders({
    purchaseDate,
    requestedDate,
    siteName,
    siteManager,
    supplierName,
    itemId,
    itemName,
    itemQuantity,
    totPrice,
    isRestricted,
    deliveryNote,
    status
  })

  try {
    await OrdersItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    })
    return next(error)
  }

  res.status(201).json({
    ordersItem: OrdersItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  })
}

const getOrders = async (req, res) => {
  Orders.find({})
    .then((orders) =>
      res.json({
        orders: orders,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editOrders = async (req, res) => {
  const {
    orders,
    id
  } = req.body

  const query = {
    '_id': id
  }

  Orders.findOneAndUpdate(query, orders, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      })
    return res.json({
      orders: item,
      message: 'Edited Successfully'
    })
  })
}

const deleteOrders = async (req, res) => {
  const {
    id
  } = req.body

  Orders.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err)
  })

  return res.json({
    message: 'Deleted Successfully'
  })
}

const getOrder = async (req, res, next) => {
  let order

  const {
    id
  } = req.params

  try {
    order = await Orders.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(order)
}

exports.createOrders = createOrders
exports.editOrders = editOrders
exports.getOrders = getOrders
exports.getOrder = getOrder
exports.deleteOrders = deleteOrders
