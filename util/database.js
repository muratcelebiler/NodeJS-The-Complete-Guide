// Sequelize modülünü dahil ediyoruz
const Sequelize = require('sequelize');

const sequelize = new Sequelize('app', 'root', 'V4pQNJYuyHeDRAbNuMUjxwqL4raCAVUE', {
    dialect: 'mysql',
    host: 'database'
});

module.exports = sequelize;