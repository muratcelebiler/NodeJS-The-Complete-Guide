// Express dahil ediyoruz
const express = require('express');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// Controllers
const productController = require('../controllers/product');

router.get('/', productController.getProducts);

// Export ediyoruz
module.exports = router;