// modelos/producto.js
const { mongoose } = require("../bd/conexion");

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Producto', productoSchema);
