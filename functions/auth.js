const jwt = require('jsonwebtoken');


async function authorization(req, res, next) {
    //const authHeader = req.headers['Authorization'];
    const accessToken = req.cookies['accessToken'];
    const token = accessToken && accessToken.split(' ')[1];
    if (token == null) {
        console.log(token);
        return res.status(401).json({ message: token })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) return res.status(403), json({ message: "invalid Token" });
        req.userData = userData;
        next();
    })
}

module.exports = authorization;