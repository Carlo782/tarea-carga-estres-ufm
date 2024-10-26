const express = require('express');
const router = express.Router();
const userAdminController = require('../controllers/userAdmin.controllers');

router.post('/login', userAdminController.loginAdmin);

module.exports = router;
