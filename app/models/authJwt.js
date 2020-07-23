const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const db = require('./db');
const User = db.user;

verifyToken = (req, res, next) => {
    
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, config.secret, (err, decode) => {
        
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized'
            });
        }

        req.userID = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    
    User.findByPk(req.userID).then(user => {
        
        user.getRoles().then(roles => {
            
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require admin role to access this'
            });
        });
    });
};

isModerator = (req, res, next) => {
    
    User.findByPk(req.userID).then(user => {
        
        user.getRoles().then(roles => {
            
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require moderator role to access this'
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    
    User.findByPk(req.userID).then(user => {
        
        user.getRoles().then(roles => {
        
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator' || roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require moderator or admin role to access this'
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;