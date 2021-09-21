const express = require('express');

// Initialize exporess router
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');

// POST -> create
router.post('/create', userController.create);

// Export router module
module.exports = router;