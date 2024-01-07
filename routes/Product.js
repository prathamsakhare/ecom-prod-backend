const { createProduct, fetchAllProducts } = require("../controller/Product");

const express = require("express");

const router = express.Router();

router.post("/createproduct", createProduct).get("/", fetchAllProducts);

exports.router = router;
