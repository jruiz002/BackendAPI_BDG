"use strict"

const Product = require("../models/ProductModel")
const { dataObligatory } = require("../utils/validate");

exports.insertProduct = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            name: body.name.toUpperCase(),
            price: body.price
        }
        const msg = await dataObligatory(data);
        // Verificacion campos vacios
        if (msg) return res.status(400).send(msg);

        // Se realiza la consulta
        let productFound = await Product.findOne({ name: body.name.toUpperCase(), price: body.price });
        if (productFound) return res.status(400).send({ message: 'Este producto ya existe.' });

        let producto = new Product(data);
        await producto.save();
        return res.status(200).send({ message: 'Producto agregado exitosamente.' });
    } catch (error) {
        return error;
    }
}

exports.getProducts = async (req, res) => {
    try {
        // Se busca todos los productos en la base de datos
        const products = await Product.find();
        // Se verifica si hay productos
        if (products.length === 0) {
            return res.status(404).send({ message: "No se encontraron productos." });
        }

        return res.status(200).send(products);
    } catch (error) {
        return error;
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const idProducto = req.params.id;
        
        // Se busca el producto por su ID antes de eliminarlo
        const productFound = await Product.findById(idProducto);
        
        if (!productFound) return res.status(404).send({ message: "El producto no existe." });

        // Si el producto existe, procede a eliminarlo
        const productDelet = await Product.findOneAndDelete({ _id: idProducto });

        return res.status(200).send({ message: "Producto eliminado exitosamente.", productDelet });
    } catch (error) {
        return res.status(500).send({ message: "Error al eliminar el producto."})
    }
};
