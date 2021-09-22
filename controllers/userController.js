// Models
const User = require('../models/user');

// Post -> create
exports.create = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    user.save()
        .then(user => {
            res.status(200).json({
                success: true,
                user: user
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            });
        });
};