const express = require('express');

// Initialize exporess router
const router = express.Router();

// POST -> create
router.post('/create', (req, res, next) => {
    res.status(200).json({"success": true});
});

// Export router module
module.exports = router;