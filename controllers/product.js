// Models
const Product = require('../models/product');

// product => GET
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

// add product => POST
exports.postAddProduct = (req, res, next) => {
    // Product sınıfını oluşturuyoruz
    const product = new Product(req.body.title);

    // Product kaydediyoruz
    product.save();
    
    res.redirect('/');
};


// products => GET
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};