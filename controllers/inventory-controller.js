const HttpError = require('../models/http-errors')
const Inventorys = require('../models/inventory.model')

const createInventorys = async (req, res, next) => {
  const {itemName, unitPrice,unitsInStock,thersholdUnits,status,description,isRestricted} = req.body

  const InventorysItem = new Inventorys({
    itemName, 
    unitPrice,
    unitsInStock,
    thersholdUnits,
    status,
    description,
    isRestricted
  })

  try {
    await InventorysItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    inventorysItem: InventorysItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getInventorys = async (req, res, next) => {
  Inventorys.find({})
    .then((inventorys) =>
      res.json({inventorys: inventorys, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editInventorys = async (req, res, next) => {
  const {inventorys, id} = req.body
  const query = {'_id': id}
  Inventorys.findOneAndUpdate(query, inventorys, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({inventorys: item, message: 'got results'})
  })
}

const deleteInventorys = async (req, res, next) => {
  const {id} = req.body
  Inventorys.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getInventory = async (req, res, next) => {
  let inventory

  const {
    id
  } = req.params

  try {
    inventory = await Inventorys.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(inventory)
}

exports.createInventorys = createInventorys
exports.editInventorys = editInventorys
exports.getInventorys = getInventorys
exports.getInventory = getInventory
exports.deleteInventorys = deleteInventorys

