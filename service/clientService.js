var config = require("../config/config");
const _ = require("lodash");
const policyService = require("./policyService");
const http = require("./httpService");

exports.findByEmail = async function(email) {
  const clientData = await exports.getClientsData();
  var clientByEmail = _.find(clientData.clients, function(o) {
    return o.email.toLowerCase() === email.toLowerCase();
  });

  return clientByEmail;
};

exports.findByName = async function(name) {
  const clientData = await exports.getClientsData();
  var clientsByName = _.filter(clientData.clients, function(o) {
    return o.name.toLowerCase() === name.toLowerCase();
  });

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
    id: policyById.clientId
  });

  return filteredPolicyById;
};

exports.getClientsData = async function() {
  const listOfClients = await http.get(config.clientEndPoint);

  return listOfClients;
};
