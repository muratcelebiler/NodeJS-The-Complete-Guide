// Express
const express = require('express');
const app = express();

// Modules
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Controllers
const errorController = require('./controllers/error');

// Sequelize
const sequelize = require('./util/database');

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

// Migration
sequelize.sync()
    .then(result => {
        // Sync başarılı olursa app'i ayağa kaldırıyoruz
        app.listen(3000);
    }).catch(error => {
        console.log('Sequelize sync error' + error);
    });