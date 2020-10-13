const express = require('express')
const router = express.Router()

const PolicyController = require('../controllers/policy-controller')

router.post('/create',PolicyController.createPolicys)
router.get('/getPolicys',PolicyController.getPolicys)
router.get('/getPolicys/:id',PolicyController.getPolicy)
router.put('/editPolicys',PolicyController.editPolicys)
router.delete('/deletePolicys',PolicyController.deletePolicys)

module.exports = router
