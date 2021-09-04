// Express dahil ediyoruz
const express = require('express');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// add-product endpointini ekledik
router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// product endpointini ekledik
router.post('/add-product', (req, res, next) => {
    // Console log message
    console.log(req.body);

    res.send('<h1>Add Product POST Method</h1>');
});

// Export ediyoruz
module.exports = router;