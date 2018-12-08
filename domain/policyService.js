var config = require("../config/config");
const request = require("request");
const clientService = require("./clientService");
const _ = require("lodash");

exports.findById = async function(id) {
  const policyData = await exports.getPolicyData();
  var policyById = _.filter(policyData.policies, {
    id: id
  });

  return policyById;
};

exports.findByClientId = async function(clientId) {
  const policyData = await exports.getPolicyData();
  var filteredByClientId = _.filter(policyData.policies, {
    clientId: clientId
  });

  return filteredByClientId;
};

exports.getPoliciesByUserName = async function(name) {
  const clientByName = await clientService.findByName(name);
  console.log(clientByName);
  const policiesByClientId = await exports.findByClientId(clientByName[0].id);

  return policiesByClientId;
};

exports.getPolicyData = function() {
  return new Promise(function(resolve, reject) {
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
        resolve(JSON.parse(response.body));
      })
      .end();
  });
};
