var config = require("../config/config");
const request = require("request-promise");
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
  const policiesByClientId = await exports.findByClientId(clientByName[0].id);

  return policiesByClientId;
};

exports.getPolicyData = async function() {
  var options = {
    uri: config.policyEndPoint,
    method: "GET",
    json: true
  };

  const result = await request(options);

  return result;
};
