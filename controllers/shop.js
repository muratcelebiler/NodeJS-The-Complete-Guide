// Product modelini dahil ediyoruz
const Product = require('../models/product');
const user = require('../models/user');
const Order = require('../models/order');

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product
    .findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(error => console.log(error));
};

exports.postCart = ((req, res, next) => {
  // Request'ten gelen productId değeri
  const productId = req.body.productId;

  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => console.log('postCart', error));
});

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(error => console.log('getIndex error', error));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(error => console.log('getCart error', error));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      return res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(error => console.log('getOrders error', error));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  
  req.user
    .removeFromCart(productId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => console.log('postCartDeleteProduct error', error));
};

exports.postCreateOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(item => {
        return {
          product: item.productId._doc,
          quantity: item.quantity
        }
      });

      const order = new Order({
        products: products,
        user: {name: req.user.name, id: req.user}
      });

      return order.save();
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(error => console.log('postCreateOrder error', error));
};
