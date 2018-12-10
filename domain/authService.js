var config = require("../config/config");
const jwt = require("../node_modules/jsonwebtoken");

exports.getToken = async function(user) {
  const jwtres = jwt.sign(
    { id: user.id, name: user.name, email: user.email, roles: user.role },
    config.secret,
    {
      expiresIn: 3600 // expires in 1 hour
    }
  );

  return jwtres;
};
