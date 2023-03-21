const jwt = require('jsonwebtoken');

async function authorization(req, res, next) {
    let accessToken;
    if (!req.cookies['accessToken']) {
        if(req.headers.authorization) {
            accessToken = req.headers.authorization.slice(8);
        } else {
            return res.status(401).json();
        } 
    } else {
        accessToken = req.cookies['accessToken']
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: "invalid Token" });
        }
        res.userData = userData;
        next();
    })
}

module.exports = authorization;