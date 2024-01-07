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

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find();
  let totalProductsQuery = Product.find();

  // * query for category and brand
  if ((req, query.category)) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = (await totalProductsQuery).findIndex({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = (await totalProductsQuery).findIndex({
      brand: req.query.brand,
    });
  }

  // * query for sorting (Ascending or Descending Order)
  if (req.query._sort && req.query._order) {
    query = query.sort([[req.query._sort, req.query._order]]);
  }

  // * query for finding total count of documents
  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  // * query for pagination
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};
