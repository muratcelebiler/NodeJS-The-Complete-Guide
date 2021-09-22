// Express validatior check
const { body } = require('express-validator/check');

// Valitor
const validator = require('./validator');

// Validation criteria
const validations = [
    body('name').trim().isLength({min:1})
];

module.exports = [...validations, validator];