const HttpError = require('../models/http-errors')
const Inventories = require('../models/inventory.model')

const createInventories = async (req, res, next) => {
  const {
    itemName,
    unitPrice,
    unitsInStock,
    thresholdUnits,
    status,
    description,
    isRestricted
  } = req.body

  const InventoriesItem = new Inventories({
    itemName,
    unitPrice,
    unitsInStock,
    thresholdUnits,
    status,
    description,
    isRestricted
  })

  try {
    await InventoriesItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    })
    return next(error)
  }

  res.status(201).json({
    inventoriesItem: InventoriesItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  })
}

const getInventories = async (req, res) => {
  Inventories.find({})
    .then((inventories) =>
      res.json({
        inventories: inventories,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editInventories = async (req, res) => {
  const {
    inventories,
    id
  } = req.body

  const query = {
    '_id': id
  }

  Inventories.findOneAndUpdate(query, inventories, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      })
    return res.json({
      inventories: item,
      message: 'Edited Successfully'
    })
  })
}

const deleteInventories = async (req, res) => {
  const {
    id
  } = req.body

  Inventories.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err)
  })

  return res.json({
    message: 'Deleted Successfully'
  })
}

const getInventory = async (req, res, next) => {
  let inventory

  const {
    id
  } = req.params

  try {
    inventory = await Inventories.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(inventory)
}

exports.createInventories = createInventories
exports.editInventories = editInventories
exports.getInventories = getInventories
exports.getInventory = getInventory
exports.deleteInventories = deleteInventories