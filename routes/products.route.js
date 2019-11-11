const products = require("../controllers/products.controller")

module.exports = function (router) {
  router.options("/products", (req, res) => {
    res.header("Allow", "OPTIONS, GET, POST");
    res.status(204);
    res.end();
  });

  router.get("/products", products.readAll)
  router.get("/products/:id", products.readOne)
  router.delete("/products/:id", products.deleteOne)
  router.patch("/products/:id", products.updateOne)
  router.post("/products", products.createOne)

}