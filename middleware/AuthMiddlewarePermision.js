const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    //get Auth token from header
    const token = req.header("token");
    if (!token) return res.status(401).send("Access Denied");

    try {
        const decodedPayload = jwt.verify(token, process.env['SECRET_KEY']);
        //Check role
        if (!decodedPayload.adminRole) return res.status(401).send("Access Denied You're not admin");
        if (!decodedPayload.sellerRole) return res.status(401).send("Access Denied You're not seller");
        next();
    } catch (err) {
        res.status(400).send("Invalid Token")
    }

}