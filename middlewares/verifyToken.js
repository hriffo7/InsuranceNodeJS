var jwt = require("jsonwebtoken");
var configValues = require("../config/config");

module.exports = function(request, response, next) {
  var token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"] ||
    request.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, configValues.secret, function(err, decoded) {
      if (err) {
        //failed verification.
        return response
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      request.decoded = decoded;
      next();
    });
  } else {
    // forbidden without token
    return response
      .status(403)
      .send({ auth: false, message: "No token provided." });
  }
};
