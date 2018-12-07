const http = require("http");
var config = require("../config/config");
const request = require("request");
const clientService = require("./clientService");

// exports.getPolicies = function() {
//   return new Promise(function(resolve, reject) {
//     http.get(config.policyEndPoint, resp => {
//       let data = "";
//       resp.on("data", chunk => {
//         data += chunk;
//       });
//       resp.on("end", () => {
//         resolve(JSON.parse(data));
//       });
//     });
//   });
// };
exports.findByClientId = function(clientId) {
  return new Promise(function(resolve, reject) {
    this.getPolicyData(function(err, result) {
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

// exports.getPoliciesByUserName = function(name) {
//   return new Promise(function(resolve, reject) {
//     clientService.findByName(name).then(client => {
//       findByClientId(client[0].id).then(data => {
//         //   if (err) {
//         //     console.log(err);
//         //   }
//         //   var filteredById = _.filter(data.policies, { clientId: id });
//         resolve(data);
//       });
//       //resolve(client);
//     });
//     // policyService.getPolicyData(function(err, result) {
//     //   if (err) {
//     //     console.log(err);
//     //   }
//     //   var filteredPolicyById = _.filter(result.policies, { id: id });
//     //   var clientId = filteredPolicyById[0].clientId;
//     //   getClientsData(function(err, result) {
//     //     if (err) {
//     //       console.log(err);
//     //     }
//     //     var filteredById = _.filter(result.clients, { id: clientId });
//     //     console.log(filteredById);
//     //     resolve(filteredById);
//     //   });
//     // });
//   });
// };
