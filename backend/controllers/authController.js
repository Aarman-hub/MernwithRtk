const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const getAuthToken = require('../utils/getAuthToken');

const registerController = async (req, res) =>{
    const schema = Joi.object({
        email: Joi.string().min(12).max(50).required().email(),
        username:Joi.string().min(5).max(20).required(),
        password:Joi.string().min(6).max(200).required()
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const {email, username, password} = req.body

    let user = await User.findOne({email});

    if(user) return res.status(400).send("User already exixts!")

    user = new User({
        email,
        username,
        password
    });

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    user =  await user.save();
    const token = getAuthToken(user);

    res.send(token)

}
const loginController = async (req, res) =>{
    const schema = Joi.object({
        email: Joi.string().min(12).max(50).required().email(),
        password:Joi.string().min(6).max(200).required()
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const {email, password} = req.body

    let user = await User.findOne({email});

    if(!user) return res.status(400).send("User is not avialable")

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(400).send("Password is not correct!")


    const token = getAuthToken(user)

    res.send(token)


}

const getMeController = async (req, res) =>{}



module.exports = {
    registerController,
    loginController,
    getMeController
}