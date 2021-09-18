// Mongoose modülünü dahil ediyoruz
const mongoose = require('mongoose');

// Mongoose içerisindeki Schema construct'ın çağırıyoruz
const Schema = mongoose.Schema;

// Schema ile modelimizi oluşturuyoruz. id field'ını oluşturmaya gerek yok mongoose kendisi otomatik oluşturmaktadır.
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);