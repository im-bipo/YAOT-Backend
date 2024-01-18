const express = require('express')
const { createNewUser, checkForExistingUser } = require('../controllers/user')


const router = express.Router()

router.route('/login').post(createNewUser)
router.route('/signup').post(checkForExistingUser)

module.exports = router