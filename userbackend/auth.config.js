module.exports = {
    secret: process.env.JWT_SECRET_KEY,
    jwtExpiration: 60*60,
};