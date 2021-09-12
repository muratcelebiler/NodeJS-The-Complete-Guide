// Sequelize modülünü dahil ediyoruz
// Sequelize bu şekilde süslü parantezler içerisinde çağırmamızın sebebi Vscode id'sinde Sequelize.create gibi methodların gözükmesidir. Bu şekilde çağırmazsak Vscode içerisinde bu methodlar gözükmüyor.
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('app', 'root', 'V4pQNJYuyHeDRAbNuMUjxwqL4raCAVUE', {
    dialect: 'mysql',
    host: 'database'
});

module.exports = sequelize;