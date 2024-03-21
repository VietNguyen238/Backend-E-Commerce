const User = require('../models/user')

const purchaseController = {
    addToCart: async (req, res) => {
        try {
            console.log("Added", req.body.itemId)
            const userData = await User.findOne({ _id: req.user.id })
            console.log(userData.cartData)
            userData.cartData[req.body.itemId] += 1
            await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
            res.json("Added")
        } catch (error) {
            res.status(404).json(error)
        }
    },

    removeFromCart: async (req, res) => {
        try {
            console.log("Removed", req.body.itemId)
            const userData = await User.findOne({ email: req.user.id })
            if (userData.cartData[req.body.itemId] > 0) {
                userData.cartData[req.body.itemId] -= 1
                await User.findOneAndDelete({ id: req.body.id }, { cartData: userData.cartData })
                res.send('Removed')
            }
        } catch (error) {
            res.status(404).json(error)
        }
    },

    getCart: async (req, res) => {
        try {
            console.log('Get cart')
            let userData = await User.findOne({ _id: req.user.id })
            res.json(userData.cartData)
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = purchaseController