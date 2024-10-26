const express = require('express');
const router = express.Router();
const poiController = require('../controllers/poi.controller');
const authenticateAdmin = require('../middlewares');


router.post('/pois', authenticateAdmin, poiController.createPOI);
router.get('/pois', poiController.getAllPOIs);
router.get('/pois/:id', poiController.getPOIById);
router.put('/pois/:id', authenticateAdmin, poiController.updatePOI);
router.delete('/pois/:id', authenticateAdmin, poiController.deletePOI);

module.exports = router;
