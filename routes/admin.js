// Express dahil ediyoruz
const express = require('express');

// Controllers
const productController = require('../controllers/product');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// Ürünlerin listeleneceği array
const products = [];

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

// Export ediyoruz
exports.routes = router;
exports.products = products;