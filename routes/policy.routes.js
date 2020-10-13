const express = require('express')
const router = express.Router()

const PolicyController = require('../controllers/policy-controller')

router.post('/create', PolicyController.createPolicies)
router.get('/getPolicies', PolicyController.getPolicies)
router.get('/getPolicies/:id', PolicyController.getPolicy)
router.put('/editPolicies', PolicyController.editPolicies)
router.delete('/deletePolicies', PolicyController.deletePolicies)

module.exports = router
