const errors = require('restify-errors')
const Product = require('../models/Product');
const rjwt = require('restify-jwt-community');
const config = require('../config');

module.exports = server => {

  //GET Products
  server.get('/products', async(req, res, next) => {
    try{
      const product = await Product.find({});
      res.send(product);
      next();
    } catch(err){
      return next(new errors.InvalidContentError(err));
    }
  });

  //GET Single Product
  server.get('/products/:id', async(req, res, next) => {
    try{
      const product = await Product.findById(req.params.id);
      res.send(product);
      next();
    } catch(err){
      return next(new errors.ResourceNotFoundError(`There is no product with the id of ${req.params.id}`));
    }
  });

  //Add Product = protect this route
  server.post('/products', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    //Check for JSON
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, title, price, description, image } = req.body
    const product = new Product({name, title, price, description, image});
    try{
      const newProduct = await product.save();
      res.send(newProduct);
      next();
    }catch(err){
      return next(new errors.InternalError(err.message));
    }
  });

  //Update Product
  server.put('/products/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    //Check for JSON
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    try{
      const product = await Product.findOneAndUpdate({ _id: req.params.id}, req.body);
      res.send(200);
      next();
    }catch(err){
      return next(new errors.ResourceNotFoundError(`There is no product with the id of ${req.params.id}`));
    }
  });

  //Delete Product
  server.del('/products/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {;
    try{
      const product = await Product.findOneAndRemove({ _id: req.params.id });
      res.send({message: `Product with ${req.params.id} deleted`});
      next();
    }catch(err){
      return next(new errors.ResourceNotFoundError(`There is no product with the id of ${req.params.id}`));
    }
  })
}
