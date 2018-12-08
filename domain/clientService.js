var config = require("../config/config");
const _ = require("lodash");
const request = require("request");
const policyService = require("./policyService");

exports.getClients = function() {
  return new Promise(function(resolve, reject) {
    getClientsData(resolve);
  });
};

getClientsData = function(callBack) {
  request
    .get(config.clientEndPoint, function(err, response) {
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

exports.findByName = function(name) {
  return new Promise(function(resolve, reject) {
    this.getClientsData(function(err, result) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      var filteredByName = _.filter(result.clients, { name: name });
      resolve(filteredByName);
    });
  });
};

exports.findById = function(id) {
  return new Promise(function(resolve, reject) {
    getClientsData(function(err, result) {
      if (err) {
        console.log(err);
      }
      var filteredById = _.filter(result.clients, { id: id });
      resolve(filteredById);
    });
  });
};

exports.findByPolicyId = function(id) {
  return new Promise(function(resolve, reject) {
    policyService.getPolicyData(function(err, result) {
      if (err) {
        console.log(err);
      }
      var filteredPolicyById = _.filter(result.policies, { id: id });
      var clientId = filteredPolicyById[0].clientId;

      getClientsData(function(err, result) {
        if (err) {
          console.log(err);
        }
        var filteredById = _.filter(result.clients, { id: clientId });
        resolve(filteredById);
      });
    });
  });
};
