// Express dahil ediyoruz
const express = require('express');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

// add-product endpointini ekledik
router.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// product endpointini ekledik
router.post('/product', (req, res, next) => {
    // Console log message
    console.log(req.body);

    //Bu komutu eklemediğimizde bir sonraki aşamaya geçemiyoruz ve bu middleware içerisinde hapsoluyoruz.
    next();
});

// Export ediyoruz
module.exports = router;