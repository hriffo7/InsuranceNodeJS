const express = require("express");
var policyController = require("./controllers/policyController");
var clientController = require("./controllers/clientController");
var authController = require("./controllers/authController");
const bodyParser = require("body-parser");
// const verifyToken = require("./middlewares/verifyToken");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

policyController(app);
clientController(app);
authController(app);

var port = process.env.PORT || 3000;

app.listen(port);
