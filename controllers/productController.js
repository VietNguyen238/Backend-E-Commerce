const Product = require('../models/product')

const productController = {

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find({})
            console.log("All products Fetched")
            res.send(products)
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addProduct: async (req, res) => {
        try {
            const products = await Product.find({})
            let id;

            if (products.length > 0) {
                last_product_array = products.slice(-1)
                last_product = last_product_array[0]
                id = last_product.id + 1
            } else {
                id = 1
            }

            const product = new Product({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                new_price: req.body.new_price,
                old_price: req.body.old_price,
            })
            await product.save()
            console.log("Saved")
            res.json({
                success: true,
                name: req.body.name
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    removeProduct: async (req, res) => {
        try {
            await Product.findOneAndDelete({ id: req.body.id })
            console.log("Removed Product")
            res.json({
                success: true,
                name: req.body.name
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },

    newCollections: async (req, res) => {
        try {
            const products = await Product.find({})
            const newcollection = products.slice(1).slice(-8)
            console.log("NewCollection Fetched")
            res.send(newcollection)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    popularInWomen: async (req, res) => {
        try {
            const products = await Product.find({ 'category': "women" })
            const popular_in_women = products.slice(0, 4)
            res.send(popular_in_women)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = productController