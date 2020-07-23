const verifySignupModel = require('../models/verifySignUp.js');
const authController = require('../controllers/auth.js');

module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headders',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/signup', [verifySignupModel.checkDuplicateUsernameOrEmail, verifySignupModel.checkRolesExisted], authController.signUp);

    app.post('/signin', authController.signIn);
}