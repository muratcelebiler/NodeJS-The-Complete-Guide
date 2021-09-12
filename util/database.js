// Sequelize modülünü dahil ediyoruz
const Sequelize = require('sequelize');

const sequelize = new Sequelize('app', 'root', 'V4pQNJYuyHeDRAbNuMUjxwqL4raCAVUE', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;