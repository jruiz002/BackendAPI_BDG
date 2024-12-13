"use strict"

const express = require('express');
const api = express.Router();

const productController = require("../controllers/ProductController")

api.post("/insertProduct", productController.insertProduct)
api.get("/getProducts", productController.getProducts)
api.delete("/deleteProduct/:id", productController.deleteProduct)

module.exports = api;