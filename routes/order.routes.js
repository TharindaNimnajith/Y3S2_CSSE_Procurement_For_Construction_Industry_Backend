const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order-controller');

router.post('/create', OrderController.createOrders);
router.get('/getOrders', OrderController.getOrders);
router.get('/getOrders/:id', OrderController.getOrder);
router.put('/editOrders', OrderController.editOrders);
router.delete('/deleteOrders', OrderController.deleteOrders);
router.post('/addInvoiceOrder/:id', OrderController.addInvoiceOrder);
router.put('/editOrderStatus', OrderController.editOrderStatus);
router.post('/editOrderRejectReasonPS', OrderController.editOrderRejectReasonPS);
router.post('/editOrderRejectReasonSup', OrderController.editOrderRejectReasonSup);
router.post('/editOrderRejectReasonDM', OrderController.editOrderRejectReasonDM);

module.exports = router;
