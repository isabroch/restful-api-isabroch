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
    products.doc(req.params.id.toUpperCase()).get().then(doc => {
      res.json(doc.data());
    })
  },

  deleteOne: (req, res) => {
    // delete shit (delete)
  },

  updateOne: (req, res) => {
    // update shit (update / patch)
  },

  createOne: (req, res) => {
    // create shit (create / post)
    const data = {
      ...req.fields

      // = {category, description, details, id, images, name}
      // = category: req.fields.category
      // = description: req.fields.description
      // = details: req.fields.details
      // ... osv...

      // category: "cheese",
      // description: ["words oo lala", "more words oooo"],
      // details: {
      //   country: "Denmark",
      //   price: 500,
      //   weight: 220
      // },
      // id: 8,
      // images: [{
      //     alt: "Primary image",
      //     url: "cheese_01.jpg"
      //   },
      //   {
      //     alt: "Secondary image",
      //     url: "cheese_02.jpg"
      //   },
      //   {
      //     alt: "Secondary image",
      //     url: "cheese_03.jpg"
      //   }
      // ],
      // name: "Mystery Cheese"
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