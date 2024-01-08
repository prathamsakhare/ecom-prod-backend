const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    brand
      .save()
      .then((brand) => {
        res.json({ status: "success", brand });
      })
      .catch((err) => {
        res.json({ status: "error", message: err.message });
      });
  };