var config = require("../config/config");
const clientService = require("./clientService");
const http = require("./httpService");
const _ = require("lodash");

exports.findById = async function(id) {
  const policyData = await exports.getPolicyData();
  var policyById = _.find(policyData.policies, {
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
  const listOfPolicies = await http.get(config.policyEndPoint);

  return listOfPolicies;
};
