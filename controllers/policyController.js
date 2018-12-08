var policyService = require("../domain/policyService");

module.exports = function(app) {
  app.get(
    "/api/policy/getPoliciesByUserName/:userName",
    async (request, response) => {
      try {
        const policiesByUserName = await policyService.getPoliciesByUserName(
          request.params.userName
        );
        response.send(policiesByUserName);
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  );
};
