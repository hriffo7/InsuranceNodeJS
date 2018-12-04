var express = require("express");
var policyController = require("./controllers/policyController");
var clientController = require("./controllers/clientController");

var app = express();
policyController(app);
clientController(app);

var port = process.env.PORT || 3000;

app.listen(port);
