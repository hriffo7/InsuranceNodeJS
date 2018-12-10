var config = require("../config/config");
const _ = require("lodash");
const request = require("request-promise");
const policyService = require("./policyService");

exports.findByEmail = async function(email) {
  const clientData = await exports.getClientsData();
  var clientByEmail = _.filter(clientData.clients, { email: email });

  return clientByEmail[0];
};

exports.findByName = async function(name) {
  const clientData = await exports.getClientsData();
  var clientsByName = _.filter(clientData.clients, { name: name });

  return clientsByName;
};

exports.findById = async function(id) {
  const clientData = await exports.getClientsData();
  var clientById = _.filter(clientData.clients, { id: id });

  return clientById;
};

exports.findByPolicyId = async function(id) {
  const policyById = await policyService.findById(id);

  const clientsData = await exports.getClientsData();
  var filteredPolicyById = _.filter(clientsData.clients, {
    id: policyById[0].clientId
  });

  return filteredPolicyById;
};

exports.getClientsData = async function() {
  var options = {
    uri: config.clientEndPoint,
    method: "GET",
    json: true
  };

  const result = await request(options);

  return result;
};
