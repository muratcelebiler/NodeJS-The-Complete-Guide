// Include express
const express = require('express');

// Import sequelize
const sequelize = require('./util/database');

// Initialize express contructor
const app = express();

// Routes
const userRoutes = require('./routes/userRoutes');

// Initialize routes
app.use('/user', userRoutes);

// Sequelize sync added for connection mysql
sequelize.sync()
    .then(result => {
        console.log('Connected mysql');

        // Server configuration added
        app.listen(3000);
    })
    .catch(error => { console.log('app.js sequelize error ', error) });