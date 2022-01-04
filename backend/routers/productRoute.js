 const express = require('express');
const { getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetails,createProductReview,getProductReviews,deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRole } = require('../middleware/auth');
 const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRole("admin"),isAuthenticatedUser,createProduct);
router.route("/product/:id").put(isAuthenticatedUser,authorizeRole("admin"),isAuthenticatedUser,updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser,authorizeRole("admin"),isAuthenticatedUser,deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);
 module.exports = router;
 