const express = require('express');
const router = express.Router();
const routePointController = require('../controllers/routePoint.controllers.js');
const authenticateAdmin = require('../middlewares.js');

router.post('/routes-point', authenticateAdmin, routePointController.createRoutePoint);
router.get('/routes-point', routePointController.getAllRoutesPoints);
router.get('/routes-point/:id', routePointController.getRoutePointById);
router.get('/routes-point/poi/:poi_id', routePointController.getRoutePointByPoiId);
router.put('/routes-point/:id', authenticateAdmin, routePointController.updateRoutePoint);
router.delete('/routes-point/:id', authenticateAdmin, routePointController.deleteRoutePoint);


module.exports = router;
