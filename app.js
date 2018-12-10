const express = require("express");
var policyController = require("./controllers/policyController");
var clientController = require("./controllers/clientController");
var authController = require("./controllers/authController");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  {
    flags: "a"
  }
);

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

policyController(app);
clientController(app);
authController(app);

var port = process.env.PORT || 3000;

app.listen(port);
