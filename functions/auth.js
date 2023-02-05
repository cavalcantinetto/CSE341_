const jwt = require('jsonwebtoken');

async function authorization(req, res, next) {
    const accessToken = req.cookies['accessToken'];
    if (!accessToken) {
        return res.status(401).json()
    }
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) return res.status(403), json({ message: "invalid Token" });
        req.userData = userData;
        next();
    })
}

module.exports = authorization;