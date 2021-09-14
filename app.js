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
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

// Sequelize
const sequelize = require('./util/database');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Set view config
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewire
app.use((req, res, next) => {
    // sequelize sync içerisinde oluşturduğumuz user bilgilerini kullanabilmek için request içerisine inject ediyoruz.
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log('Middleware user findByPk error ', error));
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error control
app.use(errorController.get404);

// Association (relations)
// constraints true ise forign key oluştururken on update'de otomatik cascade olarak ayarlanır
Product.belongsTo(User, {constraints: true, onDelete: 'cascade'});
// Sequelize içerisinde bulunan magic methodları kullanabilmek için iki modelinde bağlantıları eksiksiz yazılmalıdır
User.hasMany(Product);
// Her kullanıcı bir sepete sahiptir. Diğer bir değişle her sepetin bir user'ı vardır.
User.hasOne(Cart);
// Sepetlerin içerisinde ürünler vardır. Dolayısıyla her sepet birden fazla ürüne sahip olabilir.
Cart.belongsToMany(Product, {through: CartItem});
// Belli bir ürünün birden fazla sepette olabilir. Örneği X ürünü 4 farklı kişinin sahip oldukları sepetlerde olabilir.
Product.belongsToMany(Cart, {through: CartItem});
// Her kullanıcı birden fazla siparişe sahip olabilir.
User.hasMany(Order);
// Bir sipariş sadece bir kişiye ait olabilir.
Order.belongsTo(User);
// Bir siparişte birden fazla ürün olabilir.
Order.belongsToMany(Product, {through: OrderItem});


// Migration
// sync({force: true}) bu şekilde yazılırsa mevcut tabloları her defasında drop edip yeniden oluşturur.
// Yani data kaybı gerçekleşir. Bu yüzden force opsiyonu asla productionda kullanılmamalıdır!
sequelize.sync()
    .then(result => {
        // Burada Laraveldeki seed yapısı gibi seeder ekleyebiliriz.
        // Örneğin app ayağa kalktıktan sonra bir endpointi test edeceğiz ve bunun için de authencation lazım. Bunun için bir user oluşturabiliriz.
        return User.findByPk(1);
    })
    .then(user => {
        if(!user) {
            return User.create({name: 'Test User', email: 'test@test.com'});
        }

        return user;
    })
    .then(user => {
        // User için bir tane sepet oluşturuyoruz. Bu işlemi burada yapmamızın sebebi uygulama ilk açıldığında verilerin hazır olması. Aslında uygulamada Sepete Ekle butonuna basınca işlem yapılmalı.
        return user.createCart();
    })
    .then(cart => {
        // Sync başarılı olursa app'i ayağa kaldırıyoruz
        app.listen(3000);
    })
    .catch(error => console.log('Sequelize sync error' + error));