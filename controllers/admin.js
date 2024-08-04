const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  const product = new Product(title, imageUrl, description, price, null);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    console.log("NO Edit Mode");
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findById(prodId, product =>{
    if(!product){
      console.log("No Product");
      return res.redirect('/');
    }
    // console.log(product);
    // product.price = +product.price;
    product.price = parseFloat(product.price) || 0;
    // console.log(product);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product:product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl= req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(updatedTitle,updatedImageUrl, updatedDesc, updatedPrice, prodId);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};



exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl= req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(updatedTitle,updatedImageUrl, updatedDesc, updatedPrice, prodId);
  updatedProduct.delete();
  res.redirect('/admin/products');
}
