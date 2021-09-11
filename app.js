// Express
const express = require('express');
const app = express();

// Modules
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Veritabanını kullanmak için projeye dahil ediyoruz
const db = require('./util/database');

// Test için bir query sorgusu atıyoruz
db.execute('SELECT * FROM products')
    .then(result => {
        console.log('db result: ', result)
    })
    .catch(err => {
        console.log('db error: ', err)
});

// Controllers
const errorController = require('./controllers/error');

// Set view config
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error control
app.use(errorController.get404);

app.listen(3000);