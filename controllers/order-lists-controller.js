const HttpError = require('../models/http-errors');
const Orders = require('../models/order.model');

const getPendingOrders = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'pending'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getApprovedPurchasedOrders = async (req, res, next) => {


  let orderList;


  try {
    orderList = await Orders.find(
      {
        status: { $in: ['approved', 'pApproved'] }
      });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};

const getRejectedPurchasedOrders = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'pRejected'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getPendingOrdersSupplier = async (req, res, next) => {


  let orderList;

  const {
    supplierName
  } = req.body;


  try {
    orderList = await Orders.find(
      {
        status: { $in: ['approved', 'pApproved'] },
        supplierName: supplierName
      });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getDeliveredOrdersSupplier = async (req, res, next) => {


  let orderList;

  const {
    supplierName
  } = req.body;


  try {
    orderList = await Orders.find(
      {
        status: 'supDelivered',
        supplierName: supplierName
      });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getRejectedOrdersSupplier = async (req, res, next) => {


  let orderList;

  const {
    supplierName
  } = req.body;


  try {
    orderList = await Orders.find(
      {
        status: 'supRejected',
        supplierName: supplierName
      });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getDeliveryOrdersDManager = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'supDelivered'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};

const getDeliveryConfirmedDManager = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'deliveryConfirmed'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getDeliveryRejectedDManager = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'deliveryRejected'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};


const getDeliveredOrdersAllSuppliers = async (req, res, next) => {


  let orderList;

  try {
    orderList = await Orders.find({
      status: 'supDelivered'

    });

    console.log(orderList);


  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }
  res.status(200).send(orderList);


};

exports.getPendingOrders = getPendingOrders;
exports.getApprovedPurchasedOrders = getApprovedPurchasedOrders;
exports.getRejectedPurchasedOrders = getRejectedPurchasedOrders;
exports.getPendingOrdersSupplier = getPendingOrdersSupplier;
exports.getDeliveredOrdersSupplier = getDeliveredOrdersSupplier;
exports.getRejectedOrdersSupplier = getRejectedOrdersSupplier;
exports.getDeliveryOrdersDManager = getDeliveryOrdersDManager;
exports.getDeliveryConfirmedDManager = getDeliveryConfirmedDManager;
exports.getDeliveryRejectedDManager = getDeliveryRejectedDManager;
exports.getDeliveredOrdersAllSuppliers = getDeliveredOrdersAllSuppliers;
