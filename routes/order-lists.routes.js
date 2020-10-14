const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/order-lists-controller');

router.get('/getPendingOrders', OrdersController.getPendingOrders);
router.get('/getApprovedPurchasedOrders', OrdersController.getApprovedPurchasedOrders);
router.get('/getRejectedPurchasedOrders', OrdersController.getRejectedPurchasedOrders);
router.post('/getPendingOrdersSupplier', OrdersController.getPendingOrdersSupplier);
router.post('/getDeliveredOrdersSupplier', OrdersController.getDeliveredOrdersSupplier);
router.post('/getRejectedOrdersSupplier', OrdersController.getRejectedOrdersSupplier);
router.get('/getDeliveryOrdersDManager', OrdersController.getDeliveryOrdersDManager);
router.get('/getDeliveryConfirmedDManager', OrdersController.getDeliveryConfirmedDManager);
router.get('/getDeliveryRejectedDManager', OrdersController.getDeliveryRejectedDManager);
router.get('/getDeliveredOrdersAllSuppliers', OrdersController.getDeliveredOrdersAllSuppliers);

module.exports = router;
