// Mongoose modülünü dahil ediyoruz
const mongoose = require('mongoose');

// Mongoose içerisindeki Schema methodunu çağırıyoruz
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, required:true, ref: 'Product'},
                quantity: {type: Number, required:true}
            }
        ]
    }
});

// Bu tarz fonksiyonlara utility fonksiyon diyoruz. Laravel'deki macro fonksiyonlar gibi çalışırlar.
userSchema.methods.addToCart = function (product) {
    // Product daha önce sepete eklenmiş mi?
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    // Default quantity
    let newQuantity = 1;

    // Cart içerisindeki items'ları bir değişkene atıyoruz
    if(cartProductIndex >= 0) {
        // Product daha önce sepete eklendiği için adet sayısını arttırıyoruz.
        this.cart.items[cartProductIndex].quantity += 1;
    } else {
        // Product daha önce sepete hiç eklenmemiş.
        this.cart.items.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })

    this.cart.items = updatedCartItems;

    return this.save();
};

userSchema.methods.clearFromCart = function() {
    this.cart = {items: []};

    return this.save();
};

module.exports = mongoose.model('User', userSchema);