const express = require('express');

// Initialize router
const router = express.Router();

// Controller
const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct)

// /admin/delete-product => POST
router.post('/delete-product', adminController.postDeleteProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

// Export module
module.exports = router;