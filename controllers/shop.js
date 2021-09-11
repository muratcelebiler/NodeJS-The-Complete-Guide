const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
  .then(([product]) => {
    // product değişkeni içerisindeki birinci item içerisinde veritabanından dönen veriler mevcut.
    // Biz burada pop() methodu ile birinci elementi çağırıyoruz. Yani product[0] değerini çağırıyoruz.
    product = product.pop();

    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log('getProduct db error: ', err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log('getProducts db error: ', err));
};

exports.postCart = ((req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect('/cart');
});

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];

      for(product of products) {
        const cartProductData = cart.products.find(item => item.id === product.id);

        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};
