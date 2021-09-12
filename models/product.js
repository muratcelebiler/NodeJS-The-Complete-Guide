// Sequelize modülünü çağırıyoruz.
// Modül constant ismini büyük harf ile yazmamızın sebebi modülün bir class veya constructor dönmesidir.
const Sequelize = require('sequelize');

// Sequelize veritabanı bağlantı aracını dahil ediyoruz
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Product;