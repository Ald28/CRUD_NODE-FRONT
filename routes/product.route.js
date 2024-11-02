const express = require('express');
const Product = require("../models/product.model.js");
const router = express.Router('router');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/product.controller.js');


// definir rutas
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);




module.exports = router;