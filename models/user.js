// Initialize sequelize module
const Sequelize = require('sequelize');

// Initialize util database connection
const sequelize = require('../util/database');

// Create user model columns
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        nullable: false
    },
    name: Sequelize.STRING,
    email : Sequelize.STRING
});

// Export user model
module.exports = User;