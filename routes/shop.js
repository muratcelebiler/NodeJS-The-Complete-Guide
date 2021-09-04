// Express dahil ediyoruz
const express = require('express');

// Express içerisindeki router modülünü çağırıyoruz
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("<h1>Shop Home Page</h1>");
});

// Export ediyoruz
module.exports = router;