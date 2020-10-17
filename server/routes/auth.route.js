const express = require('express');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');
const authContoller = require('../controllers/auth.controller');

const router = express.Router();

// localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserByEmailIdAndPassword), login);

async function insert(req, res, next){
    const user = req.body;
    console.log(`registering user`, user);
    req.user = await userController.insert(user);
    next();
}

async function getUserByEmailIdAndPassword(req, res, next){
    const user = req.body;
    console.log(`searching user for `, user);

    const savedUser = await userController.getUserByEmailIdAndPassword (
        user.email,
        user.password
        );
   
        req.user = savedUser;

    next();
}

function login (req, res){
    const user = req.user;
    const token =  authContoller.generateToken(user);
    res.json({
        user,
        token
    });
}

module.exports = router;