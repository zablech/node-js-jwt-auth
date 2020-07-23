const authJwtModel = require('../models/authJwt.js');
const userController = require('../controllers/user.js');

module.exports = function (app) {
        
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/all', userController.allAccess);

    app.get('/user', [authJwtModel.verifyToken], userController.userBoard);

    app.get('/mod', [authJwtModel.verifyToken, authJwtModel.isModerator], userController.moderatorBoard);

    app.get('/admin', [authJwtModel.verifyToken, authJwtModel.isAdmin], userController.adminBoard);
}