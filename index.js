const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product.model');
const productRoute = require('./routes/product.route');

// midelware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

//routes
app.use("/api/products", productRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})

// Conectar a MongoDB usando Promesas
mongoose.connect('mongodb://127.0.0.1:27017/crud-node')
    .then(() => {
        console.log('Connected to MongoDB!')
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err)
    })