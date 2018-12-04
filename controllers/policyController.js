var policyService = require("../domain/policyService");

module.exports = function(app) {
  app.get("/api/policy/getPolicies", function(req, res) {
    policyService
      .getPolicies()
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
};
