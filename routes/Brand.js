const express = require("express");
const { fetchBrands, createBrand } = require("../controller/Brand");

const router = express.Router();

router.get("/", fetchBrands).post("/createbrand", createBrand)

exports.router = router;