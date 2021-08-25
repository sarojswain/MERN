const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log('is-Auth');
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ');
    let decodeToken;

    try{
        decodeToken = jwt.verify(token[1], 'sarojwebtoken');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodeToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodeToken.userId;
    next();

}