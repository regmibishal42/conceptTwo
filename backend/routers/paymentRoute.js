
const express = require('express');
const { processPayment, sendKhaltiKey } = require('../controllers/paymentController');
const router = express.Router();
const {isAuthenticatedUser} = require('../middleware/auth');


router.route('/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/khalti/key').get(isAuthenticatedUser,sendKhaltiKey);


module.exports = router;