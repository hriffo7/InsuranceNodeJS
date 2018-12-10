var policyService = require("../domain/policyService");
var verifyToken = require("../middlewares/verifyToken");

module.exports = function(app) {
  app.get(
    "/api/policy/getPoliciesByUserName/:userName",
    verifyToken,
    async (request, response) => {
      try {
        var decodedToken = request.decoded;
        if (decodedToken.roles != "admin") {
          response
            .status(403)
            .send("You do not have rights to perform this request");
        }
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
