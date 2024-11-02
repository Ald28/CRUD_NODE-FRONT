const Product = require("../models/product.model");

// agregar producto
const createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save()
       .then((result) => {
            res.status(201).json({
                message: 'Product created successfully!',
                product: result
            });
        })
       .catch((err) => {
            console.error('Error creating product:', err);
            res.status(500).json({
                error: err
            });
        });
};

// mostrar productos
const getProducts = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error('Error fetching products:', err);
            res.status(500).json({
                error: err
            });
        });
};

// mostrar producto por ID
const getProduct = (req, res) => {
    Product.findById(req.params.id)
       .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found!'
                });
            }
            res.json(product);
        })
       .catch((err) => {
            console.error('Error fetching product:', err);
            res.status(500).json({
                error: err
            });
        });
};

// actualizar producto
const updateProduct = (req, res) => {
    const updatedProduct = {
        name: req.body.name,
        price: req.body.price
    };

    Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
       .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found!'
                });
            }
            res.json(product);
        })
       .catch((err) => {
            console.error('Error updating product:', err);
            res.status(500).json({
                error: err
            });
        });
};

// eliminar producto
const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found!'
                });
            }
            res.status(200).json({
                message: 'Product deleted successfully!'
            });
        })
        .catch((err) => {
            console.error('Error deleting product:', err);
            res.status(500).json({
                error: err
            });
        });
};

// Exportar funciones
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
