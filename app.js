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

// Models
const Product = require('./models/product');
const User = require('./models/user');

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

// Association (relations)
// constraints true ise forign key oluştururken on update'de otomatik cascade olarak ayarlanır
Product.belongsTo(User, {constraints: true, onDelete: 'cascade'});

// Migration
// sync({force: true}) bu şekilde yazılırsa mevcut tabloları her defasında drop edip yeniden oluşturur.
// Yani data kaybı gerçekleşir. Bu yüzden force opsiyonu asla productionda kullanılmamalıdır!
sequelize.sync()
    .then(result => {
        // Sync başarılı olursa app'i ayağa kaldırıyoruz
        app.listen(3000);
    }).catch(error => {
        console.log('Sequelize sync error' + error);
    });