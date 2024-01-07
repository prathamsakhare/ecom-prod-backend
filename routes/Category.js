const express = require("express");
const { fetchCategories, createCategory } = require("../controller/Category");

const router = express.Router();

router.get("/", fetchCategories).post("/createcategory", createCategory);

exports.router = router;
