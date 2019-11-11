const products = require("../controllers/products.controller")

module.exports = function (router) {
  router.options("/products", (req, res) => {
    res.header("Allow", "OPTIONS, GET, POST");
    res.status(204);
    res.end();
  });

  router.get("/products", products.getAll)
  router.get("/products/:id", products.getOne)
  router.delete("/products/:id", products.deleteOne)
  router.patch("/products/:id", products.patchOne)
  router.post("/products", products.postOne)

}