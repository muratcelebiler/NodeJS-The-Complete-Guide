// Express
const express = require('express');
const app = express();

// Modules
const path = require('path');
const bodyParser = require('body-parser');

// Mongoose
const mongoose = require('mongoose');

// Models
const User = require('./models/user');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Controllers
const errorController = require('./controllers/error');

// Set view config
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use((req, res, next) => {
    User
        .findOne()
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(error => console.log('Middleware error', error));
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error control
app.use(errorController.get404);

// Mongodb connection
mongoose
    .connect('mongodb://mongo:27017/shop')
    .then(function (connection) {
        console.log('Connected mongo db');

        User
            .findOne()
            .then(user => {
                if(!user) {
                    const user = new User({
                        name: 'Max',
                        email: 'max@max.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            })
            .catch(error => console.log('app.js mongodb connection ', error))

        app.listen(3000);
    })
    .catch(error => {
        console.log('Disconnect to MongoDB');
        console.log(error);
    })