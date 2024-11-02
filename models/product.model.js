const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: { type: String, 
            required: [true, "El nombre del producto es obligatorio"], 
            trim: true },

        quantity: { type: Number, 
            required: [true, "La cantidad es obligatoria"], 
            min: [0, "La cantidad no puede ser negativa"]},

        price: { type: Number, 
            required: [true, "El precio es obligatorio"], 
            min: [0, "El precio no puede ser negativo"]},

        image: { type: String, 
            required: false, 
            trim: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema);
