// Express dahil ediyoruz
const express = require('express');

// Nodejs core kütüphanesinden path modülünü dahil ediyoruz
const path = require("path");

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// add-product endpointini ekledik
router.get('/add-product', (req, res, next) => {
    // __dirname bu dosyanın bulunduğu dizini(path) vermektedir
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// product endpointini ekledik
router.post('/add-product', (req, res, next) => {
    // Console log message
    console.log(req.body);

    res.send('<h1>Add Product POST Method</h1>');
});

// Export ediyoruz
module.exports = router;