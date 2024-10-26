// Importa el módulo de Express y crea un enrutador
const express = require('express');
const router = express.Router();
// Importa el controlador de POI y el middleware de autenticación
const poiController = require('../controllers/poi.controller');
const authenticateAdmin = require('../middlewares');

// Define las rutas para gestionar los Puntos de Interés (POIs)
router.post('/pois', authenticateAdmin, poiController.createPOI); // Crea un nuevo POI (requiere autenticación de administrador)
router.get('/pois', poiController.getAllPOIs); // Obtiene todos los POIs
router.get('/pois/:id', poiController.getPOIById); // Obtiene un POI específico por ID
router.put('/pois/:id', authenticateAdmin, poiController.updatePOI); // Actualiza un POI específico (requiere autenticación de administrador)
router.delete('/pois/:id', authenticateAdmin, poiController.deletePOI); // Elimina un POI específico (requiere autenticación de administrador)

// Exporta el enrutador
module.exports = router;
