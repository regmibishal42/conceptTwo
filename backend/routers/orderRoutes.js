const express = require('express');
const { newOrder,getSingleOrder,myOrders } = require('../controllers/orderController');
const router = express.Router();

const { isAuthenticatedUser,authorizeRole } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,authorizeRole('admin'),getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);

module.exports = router;