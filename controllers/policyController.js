var policyService = require("../domain/policyService");

module.exports = function(app) {
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
