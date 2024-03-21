const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userController = {

    signUp: async (req, res) => {
        try {
            const check = await User.findOne({ email: req.body.email })
            if (check) {
                res.status(400).json({ success: false, errors: "Existing user found with same email address" })
            }
            let cart = {}
            for (let i = 0; i < 300; i++) {
                cart[i] = 0
            }
            const user = new User({
                user: req.body.user,
                email: req.body.email,
                password: req.body.password,
                cartData: cart
            })

            await user.save()
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, "secret_ecom")
            res.json({ success: true, token: token })
        } catch (error) {
            res.status(404).json(error)
        }
    },

    login: async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                const passCompare = req.body.password === user.password
                if (passCompare) {
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const token = jwt.sign(data, "secret_ecom")
                    res.json({ success: true, token: token })
                } else {
                    res.json({ success: false, errors: "Wrong password" })
                }
            } else {
                req.json({ success: false, errors: "Wrong email Id" })
            }
        } catch (error) {
            res.status(404).json(error)
        }
    },
}

module.exports = userController