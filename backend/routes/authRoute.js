const express = require('express');
const {
    registerController,
    loginController,
    getMeController
} = require('../controllers/authController');


const route = express.Router();


route.post('/register', registerController);
route.post('/login', loginController);
route.get('/getme', registerController);


module.exports = route;