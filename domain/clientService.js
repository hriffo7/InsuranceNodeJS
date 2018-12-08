var config = require("../config/config");
const _ = require("lodash");
const request = require("request");
const policyService = require("./policyService");

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

exports.getClientsData = function() {
  return new Promise(function(resolve, reject) {
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
        resolve(JSON.parse(response.body));
      })
      .end();
  });
};
