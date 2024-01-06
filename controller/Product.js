const { Product } = require("../model/Product");

// Creating a new product
exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((product) => {
      res.json({ status: "success", product });
    })
    .catch((err) => {
      res.json({ status: "error", message: err.message });
    });
};
