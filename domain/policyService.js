const http = require("http");
var config = require("../config/config");

exports.getPolicies = function() {
  return new Promise(function(resolve, reject) {
    http.get(config.policyEndPoint, resp => {
      let data = "";
      resp.on("data", chunk => {
        data += chunk;
      });
      resp.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  });
};
