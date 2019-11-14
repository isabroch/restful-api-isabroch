const products = require("../models/product.model");
const {
  log
} = require("../middleware/logger")


function getDocsAsJSON(docs, res) {
  if (docs.empty) {
    res.status(404).send('No document(s) found');
  } else {
    const docsAsJSON = {};

    docs.forEach((doc) => {
      docsAsJSON[doc.id] = doc.data()
    })

    res.json(docsAsJSON);
  }
}

function correctFormTypes(form) {
  let key;

  if (form.id) {
    form.id = parseInt(form.id);
  }
  if (form.details) {
    form.details = JSON.parse(form.details);
  }
  if (form.description) {
    form.description = JSON.parse(form.description);
  }
  if (form.images) {
    form.images = JSON.parse(form.images);
  }
  if (form.category && form.id) {
    key = getKey(form.category, form.id)
  }

  return {
    fields: form,
    key: key
  }
}

function getId(input) {
  return parseInt(input.match(/\d{1,}/)[0])
}

function getKey(category, id) {
  return `${category.substring(0,2).toUpperCase()}${`${id}`.padStart(3, "0")}`
}


const productsCrud = (() => {
    function returnError(res, error) {
      res.status(500).end();
      log.error(error)
    }

    return {
      readAll: async (req, res) => {
        try {
          const allDocs = await products.get();
          getDocsAsJSON(allDocs, res)
        } catch (error) {
          returnError(res, error)
        }
      },

      readOne: async (req, res) => {
        try {
          const oneDoc = await products.where("id", "==", getId(req.params.id)).limit(1).get();
          getDocsAsJSON(oneDoc, res)
        } catch (error) {
          returnError(res, error)
        }
      },

      readQuery: async (req, res) => {
        try {
          const queryDoc = await products.where(req.params.keyMatch, req.params.typeMatch, req.params.valueMatch).get();
          getDocsAsJSON(queryDoc, res)
        } catch (error) {
          returnError(res, error);
        }

      },

      deleteOne: async (req, res) => {
        try {
          const oneDoc = await products.where("id", "==", getId(req.params.id)).limit(1).get();
          oneDoc.forEach((doc) => {
            doc.ref.delete();
            res.status(204).end();
          });
        } catch (error) {
          returnError(res, error)
        }
      },

      updateOne: async (req, res) => {
        const oneDoc = await products.where("id", "==", getId(req.params.id)).limit(1).get();
        oneDoc.forEach((doc) => {
          doc.ref.update({
            ...correctFormTypes(req.fields).fields
          });
        });
        try {
          res.status(204).end();
        } catch (error) {
          returnError(res, error)
        }
      },

      createOne: async (req, res) => {
        try {
          if (Object.entries(req.fields).length < 6) {
            res.status(404).send("Missing fields").end();
          } else {
            const data = correctFormTypes(req.fields);
            products.doc(data.key).set(data.fields);
            res.status(201).send(`Creating document with key ${data.key}`).end();
          }
        } catch (error) {
          returnError(res, error)
        }
      }
    }
  }

)();


module.exports = productsCrud;