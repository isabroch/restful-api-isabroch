const db = require("../config/database");

const ProductRef = db.collection("products");

module.exports = ProductRef;