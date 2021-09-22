const express = require('express');

// Initialize exporess router
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');

// Validations
const userCreateRequest = require('../requests/userCreateRequest');

// POST -> create
router.post('/create', userCreateRequest, userController.create);

// Export router module
module.exports = router;