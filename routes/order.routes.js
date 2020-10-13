const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/order-controller')

router.post('/create', OrderController.createOrders)
router.get('/getOrders', OrderController.getOrders)
router.get('/getOrders/:id', OrderController.getOrder)
router.put('/editOrders', OrderController.editOrders)
router.delete('/deleteOrders', OrderController.deleteOrders)
router.post('/addInvoiceOrder/:id', OrderController.addInvoiceOrder)

module.exports = router
