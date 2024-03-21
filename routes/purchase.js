const router = require('express').Router()
const purchaseController = require('../controllers/purchaseController')
const userMiddleware = require('../middleware/user')

router.post('/addtocart', userMiddleware.fetchUser, purchaseController.addToCart)
router.post('/getcart', userMiddleware.fetchUser, purchaseController.getCart)
router.post('/removefromcart', userMiddleware.fetchUser, purchaseController.removeFromCart)

module.exports = router