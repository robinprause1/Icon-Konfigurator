const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");
const User = require("../models/user.js");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).json({ jwtExpired: true, message: 'Nicht authorisiert! Sitzung ist abgelaufen.'})
    }
    return res.status(401).json({ message: "Nicht authorisiert." })
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({ message: "Kein Token übergeben!"});
    }

    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err){
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username
      }).exec((err, user) => {
        if (err) {
          return res.status(500).send({ message: 'Serverfehler' });
        }
        if (user) {
          return res.status(400).send({ message: "Nutzername ist bereits vergeben." });
        }
        next();
    });
}

const authJwt = {
    verifyToken,
    checkDuplicateUsername
}

module.exports = authJwt;