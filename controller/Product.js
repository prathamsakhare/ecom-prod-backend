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

// Fetching all products
// exports.fetchAllProducts = async (req, res) => {
//   let query = Product.find();
//   let totalProductsQuery = Product.find();

//   // * query for category and brand
//   if ((req, query.category)) {
//     query = query.find({ category: req.query.category });
//     totalProductsQuery = (await totalProductsQuery).findIndex({
//       category: req.query.category,
//     });
//   }
//   if (req.query.brand) {
//     query = query.find({ brand: req.query.brand });
//     totalProductsQuery = (await totalProductsQuery).findIndex({
//       brand: req.query.brand,
//     });
//   }

//   // * query for sorting (Ascending or Descending Order)
//   if (req.query._sort && req.query._order) {
//     query = query.sort([[req.query._sort, req.query._order]]);
//   }

//   // * query for finding total count of documents
//   const totalDocs = await totalProductsQuery.count().exec();
//   console.log({ totalDocs });

//   // * query for pagination
//   if (req.query._page && req.query._limit) {
//     const pageSize = req.query._limit;
//     const page = req.query._page;
//     query = query.skip(pageSize * (page - 1)).limit(pageSize);
//   }

//   try {
//     const docs = await query.exec();
//     res.set("X-Total-Count", totalDocs);
//     res.status(200).json(docs);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
exports.fetchAllProducts = async (req, res) => {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let condition = {}
    if(!req.query.admin){
        condition.deleted = {$ne:true}
    }
    
    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);
  
    console.log(req.query.category);
  
    if (req.query.category) {
      query = query.find({ category: {$in:req.query.category.split(',')} });
      totalProductsQuery = totalProductsQuery.find({
        category: {$in:req.query.category.split(',')},
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: {$in:req.query.brand.split(',')} });
      totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
    }

    // TODO : How to sort the products based on discounted prices rather than original one
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalProductsQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // * new : true will return the updated document to the frontend instead of the old document
    const product = await Product.findByIdAndUpdate(id, req.body, {new : true});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
