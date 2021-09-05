// Express dahil ediyoruz
const express = require('express');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// admin route dahil ediyoruz
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
});

// Export ediyoruz
module.exports = router;