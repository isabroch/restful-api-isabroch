const products = require("../models/product.model");

const productFunctions = (() => ({
  getAll: (req, res) => {
    res.json(products);
  },

  getOne: (req, res) => {
    res.json(product(req.params.id))
  },

  deleteOne: (req, res) => {
    // delete shit
  },

  patchOne: (req, res) => {
    // patch shit
  },

  postOne: (req, res) => {
    // post shit
  }
}))();

module.exports = productFunctions;