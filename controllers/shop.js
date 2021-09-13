const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log('getProduct db error: ', err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(error => console.log('getProducts error', error));
};

exports.postCart = ((req, res, next) => {
  const productId = req.body.productId;
  // Promise yapısında then() blokları arasında data aktarımı için promise dışında bir variable tanımlanabilir.
  let fetchedCart;

  // İlk olarak kullanıcının sepetini(cart) tespit ediyoruz.
  req.user
    .getCart()
    .then(cart => {
      // Bulunan sepeti etkilenen sepet olarak ekliyoruz
      fetchedCart = cart;

      // Sepetin içerisinde requestten gelen productId değerini taşıyan ürünleri tespit ediyoruz. Örneğin aynı X ürününden 3 tane var gibi...
      return cart.getProducts({where: {id: productId}});
    })
    .then(products => {
      // Varsayılan adet sayısı
      let newQuantity = 1;

      // Sepette aradığımız ürünler mevcut mu?
      if(products.length > 0) {
        // Aynı üründen birden fazla olabileceği için ilkini çekiyoruz
        product = products.pop();
        
        if(product) {
          // Bir sonraki senaryoda buraya bakacağız.
          return;
        }
      }

      // Sepette aradığımız üründen hiç yoksa ürünü buluyoruz ve sepete ekliyoruz.
      return Product.findByPk(productId)
        .then(product => {
          return fetchedCart.addProduct(product, { through: {quantity: newQuantity} })
        })
        .catch(error => console.log('Product.findByPk error', error));
    })
    .then(result => {
      return res.redirect('/cart');
    })
    .catch(error => console.log('postCart error: ', error));
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
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(error => console.log('getCart > getProducts error', error));
    })
    .catch(error => console.log('getCart error', error));
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
