const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/signup', userController.signUp)

module.exports = router