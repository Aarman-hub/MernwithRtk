const jwt = require('jsonwebtoken');


const getAuthToken = user =>{
    const jwtsecret = process.env.JWTSECRET

    const token = jwt.sign({
        _id:user._id,
        username:user.username,
        email:user.email
    }, jwtsecret);

    return token;

}

module.exports = getAuthToken;