// Import the sequelize
const { Sequelize } = require('sequelize');

// Database configuration
const DB_NAME = 'app';
const DB_USER = 'root';
const DB_PASSWORD = 'V4pQNJYuyHeDRAbNuMUjxwqL4raCAVUE';

// Database bağlantılarını ayarlıyoruz
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: 'database'
});

module.exports = sequelize;