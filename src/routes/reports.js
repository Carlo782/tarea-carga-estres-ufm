// Importa el módulo de Express y crea un enrutador
const express = require('express');
const reportController = require('../controllers/report.controller');
const router = express.Router();
const authenticateAdmin = require('../middlewares');

// Define las rutas para gestionar los reportes
router.post('/reports', reportController.createReport); // Crea un nuevo reporte
router.get('/reports', authenticateAdmin, reportController.getAllReports); // Obtiene todos los reportes (requiere autenticación de administrador)
router.get('/reports/:id', authenticateAdmin, reportController.getReportById); // Obtiene un reporte específico por ID (requiere autenticación de administrador)
router.put('/reports/:id', authenticateAdmin, reportController.updateReport); // Actualiza un reporte específico (requiere autenticación de administrador)
router.delete('/reports/:id', authenticateAdmin, reportController.deleteReport); // Elimina un reporte específico (requiere autenticación de administrador)

// Exporta el enrutador
module.exports = router;
