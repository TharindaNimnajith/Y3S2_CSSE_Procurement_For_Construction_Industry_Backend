const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment-controller');

router.post('/create', PaymentController.createPayments);
router.get('/getPayments', PaymentController.getPayments);
router.get('/getPayments/:id', PaymentController.getPayment);
router.put('/editPayments', PaymentController.editPayments);
router.delete('/deletePayments', PaymentController.deletePayments);

module.exports = router;
