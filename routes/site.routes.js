const express = require('express');
const router = express.Router();

const SiteController = require('../controllers/site-controller');

router.post('/create', SiteController.createSites);
router.get('/getSites', SiteController.getSites);
router.get('/getSites/:id', SiteController.getSite);
router.put('/editSites', SiteController.editSites);
router.delete('/deleteSites', SiteController.deleteSites);

module.exports = router;
