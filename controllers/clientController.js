var clientService = require("../domain/clientService");
var verifyToken = require("../middlewares/verifyToken");

module.exports = function(app) {
  app.get(
    "/api/client/getByName/:name",
    verifyToken,
    async (request, response) => {
      try {
        var decodedToken = request.decoded;
        console.log(decodedToken);
        if (decodedToken.roles != "admin" && decodedToken.roles != "user") {
          response
            .status(403)
            .send("You do not have rights to perform this request");
        }

        const getClientsByName = await clientService.findByName(
          request.params.name
        );
        response.send(getClientsByName);
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  );

  app.get("/api/client/getById/:id", verifyToken, async (request, response) => {
    try {
      var decodedToken = request.decoded;
      if (decodedToken.roles != "admin" && decodedToken.roles != "user") {
        response
          .status(403)
          .send("You do not have rights to perform this request");
      }
      const getClientById = await clientService.findById(request.params.id);
      response.send(getClientById);
    } catch (error) {
      response.status(400).send(error.message);
    }
  });

  app.get(
    "/api/client/getByPolicyId/:id",
    verifyToken,
    async (request, response) => {
      try {
        var decodedToken = request.decoded;
        if (decodedToken.roles != "admin") {
          response
            .status(403)
            .send("You do not have rights to perform this request");
        }
        const getClientByPolicyId = await clientService.findByPolicyId(
          request.params.id
        );
        response.send(getClientByPolicyId);
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  );
};
