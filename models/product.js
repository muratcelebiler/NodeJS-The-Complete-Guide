// Veritabanını kullanmak için projeye dahil ediyoruz
const db = require('../util/database');

const fs = require('fs');

const path = require('path');

// Models
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, image_url) VALUES (?, ?, ?, ?)',
      [
        this.title,
        this.price,
        this.description,
        this.imageUrl
      ]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id, cb) {}
};
