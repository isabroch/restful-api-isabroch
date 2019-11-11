const products = require("../models/product.model");

const productFunctions = (() => ({
  readAll: (req, res) => {
    // get all shit (read)
    products.get().then(docs => {
      const data = {};

      docs.forEach(doc => {
        data[doc.id] = doc.data();
      });

      res.json(data);
    })
  },

  readOne: (req, res) => {
    // get a single shit (read)
    // For known doc name/structure...
    products.doc(req.params.id.toUpperCase()).get().then(doc =>
      res.json(doc.data())
    )

    // For unknown doc names
    /* products.where("id", "==", parseInt(req.params.id)).limit(1).get().then(
      docs => {
        docs.forEach(
          doc => res.json(doc.data())
        )
      }
    ) */
  },

  deleteOne: (req, res) => {
    // delete shit (delete)

    // For unknown doc names
    /* products.where("id", "==", parseInt(req.params.id)).limit(1).get().then(
      docs => docs.forEach(doc => {
        doc.ref.delete()
        res.status(204).end();
      })
    ).catch(err => res.status(500).json({
      message: err
    })); */

    // For known doc names
    products.doc(req.params.id.toUpperCase()).get()
      .then(doc => {
        doc.ref.delete()
        res.status(204).end()
      })
      .catch(err => res.status(500).json({
        message: err
      }));

  },

  updateOne: (req, res) => {
    if (req.fields.id) {
      req.fields.id = parseInt(req.fields.id);
    }
    if (req.fields.details) {
      req.fields.details = JSON.parse(req.fields.details);
    }
    if (req.fields.description) {
      req.fields.description = JSON.parse(req.fields.description);
    }
    if (req.fields.images) {
      req.fields.images = JSON.parse(req.fields.images);
    }

    const data = {
      ...req.fields
    };

    // For unknown doc names
    /* products.where("id", "==", parseInt(req.params.id)).limit(1).get().then(
      docs => docs.forEach(doc => {
        doc.ref.update(data);
        res.status(204).end();
      })
    ).catch(err => res.status(500).json({
      message: err
    })); */

    // For known doc names
    products.doc(req.params.id.toUpperCase()).get()
      .then(doc => {
        doc.ref.update(data);
      })
      .catch(err => res.status(500).json({
        message: err
      }));

    products.doc(req.params.id.toUpperCase()).get().then(
      doc => {
        res.json(doc.data())
      }
    )
  },

  createOne: (req, res) => {
    // create shit (create / post)

    req.fields.id = parseInt(req.fields.id);
    req.fields.details = JSON.parse(req.fields.details);
    req.fields.description = JSON.parse(req.fields.description);
    req.fields.images = JSON.parse(req.fields.images);

    const data = {
      ...req.fields
    };

    const key = `${data.category.substring(0,2).toUpperCase()}${`${data.id}`.padStart(3, "0")}`

    products.doc(key).set(data)
      .then(() => {
        res.status(201)
          .json({
            [key]: data
          });
      })
      .catch(error => res.json(error));
  }
}))();

module.exports = productFunctions;