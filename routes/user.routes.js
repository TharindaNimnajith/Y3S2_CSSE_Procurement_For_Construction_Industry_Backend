const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user-controller')

router.post('/create', UserController.createUsers)
router.get('/getUsers', UserController.getUsers)
router.get('/getUsers/:id', UserController.getUser)
router.put('/editUsers', UserController.editUsers)
router.delete('/deleteUsers', UserController.deleteUsers)

module.exports = router