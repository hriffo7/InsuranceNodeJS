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

  app.get("/api/policy/getPoliciesByUserName/:userName", function(req, res) {
    policyService
      .getPoliciesByUserName(req.params.userName)
      .then(policiesByUserName => {
        res.send(policiesByUserName);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
};
