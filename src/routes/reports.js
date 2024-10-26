const express = require('express');
const reportController = require('../controllers/report.controller');
const router = express.Router();
const authenticateAdmin = require('../middlewares');

router.post('/reports', reportController.createReport);
router.get('/reports', authenticateAdmin, reportController.getAllReports);
router.get('/reports/:id', authenticateAdmin, reportController.getReportById);
router.put('/reports/:id', authenticateAdmin, reportController.updateReport);
router.delete('/reports/:id', authenticateAdmin, reportController.deleteReport);

module.exports = router;
