const { Brand } = require("../model/Brand");
const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category
      .save()
      .then((category) => {
        res.json({ status: "success", category });
      })
      .catch((err) => {
        res.json({ status: "error", message: err.message });
      });
  };