// Product modelini(schema) dahil ediyoruz
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user;

  // Model'den dönen değer ile bir class oluşturuyoruz
  const product = new Product({title, imageUrl, price, description, userId});

  // Ürünü kaydediyoruz
  product
    .save()
    .then(product => {
      res.redirect('/admin/products');
    })
    .catch(error => console.log('postAddProduct ', error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product
    .findById(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(error => console.log('postAddProduct ', error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product
    .findByIdAndUpdate(prodId, {
      title: updatedTitle,
      description: updatedDesc,
      price: updatedPrice,
      imageUrl: updatedImageUrl
    })
    .then(product => {
      res.redirect('/admin/products');
    })
    .catch(error => console.log('postAddProduct ', error));
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByIdAndDelete(productId)
  .then(product => {
    res.redirect('/admin/products');
  })
  .catch(error => console.log('postDeleteProduct ', error));
};

exports.getProducts = (req, res, next) => {
  Product
    .find()
    .populate('userId') // Aralarında ilişki bulunan modelleri response içerisine dahil edebiliriz. Laravel'deli with() methodu gibi
    .then(products => {
      console.log('products', products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(error => console.log(error));
};
