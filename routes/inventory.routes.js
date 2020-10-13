const express = require('express')
const router = express.Router()

const InventoryController = require('../controllers/inventory-controller')

router.post('/create', InventoryController.createInventorys)
router.get('/getInventorys', InventoryController.getInventorys)
router.get('/getInventorys/:id', InventoryController.getInventory)
router.put('/editInventorys', InventoryController.editInventorys)
router.delete('/deleteInventorys', InventoryController.deleteInventorys)

module.exports = router
