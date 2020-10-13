const express = require('express')
const router = express.Router()

const InventoryController = require('../controllers/inventory-controller')

router.post('/create', InventoryController.createInventories)
router.get('/getInventories', InventoryController.getInventories)
router.get('/getInventories/:id', InventoryController.getInventory)
router.put('/editInventories', InventoryController.editInventories)
router.delete('/deleteInventories', InventoryController.deleteInventories)

module.exports = router
