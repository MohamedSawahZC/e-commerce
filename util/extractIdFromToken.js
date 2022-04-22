const jwt = require("jsonwebtoken");

exports.getIdFromToken = (token) => {
    const decodedPayload = jwt.verify(token, "ecommerceSecret");
    //get Id
    return decodedPayload.userId;
};


exports.checkAdminPermision = (token) => {
    const decodedPayload = jwt.verify(token, "ecommerceSecret");
    return decodedPayload.adminRole;
}

