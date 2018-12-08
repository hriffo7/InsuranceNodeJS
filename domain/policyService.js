var config = require("../config/config");
const request = require("request");
const clientService = require("./clientService");
const _ = require("lodash");

exports.findByClientId = function(clientId) {
  return new Promise(function(resolve, reject) {
    exports.getPolicyData(function(err, result) {
      if (err) {
        console.log(err);
      }
      var filteredByClientId = _.filter(result.policies, {
        clientId: clientId
      });
      resolve(filteredByClientId);
    });
  });
};

exports.getPolicyData = function(callBack) {
  request
    .get(config.policyEndPoint, function(err, response) {
      if (err) {
        return reject(err);
      }
      if (response.statusCode >= 400) {
        err = new Error("Http Error");
        err.statusCode = response.statusCode;
        return reject(err);
      }
      callBack(null, JSON.parse(response.body));
    })
    .end();
};

exports.getPoliciesByUserName = function(name) {
  return new Promise(function(resolve, reject) {
    clientService.findByName(name).then(client => {
      if (client.length == 0) {
        resolve(client);
      }
      exports.findByClientId(client[0].id).then(data => {
        resolve(data);
      });
    });
  });
};
