const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/allproducts', productController.getAllProducts)
router.get('/newcollections', productController.newCollections)
router.get('/popularinwomen', productController.popularInWomen)
router.post('/removeproduct', productController.removeProduct)
router.post('/addproduct', productController.addProduct)

module.exports = router