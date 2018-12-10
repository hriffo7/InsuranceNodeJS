var clientService = require("../domain/clientService");
var verifyToken = require("../middlewares/verifyToken");

module.exports = function(app) {
  app.get(
    "/api/client/getByName/:name",
    verifyToken.authorize(["admin", "user"]),
    async (request, response) => {
      try {
        const getClientsByName = await clientService.findByName(
          request.params.name
        );
        response.send(getClientsByName);
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  );

  app.get(
    "/api/client/getById/:id",
    verifyToken.authorize(["admin", "user"]),
    async (request, response) => {
      try {
        const getClientById = await clientService.findById(request.params.id);
        response.send(getClientById);
      } catch (error) {
        response.status(400).send(error.message);
      }
    }
  );

  app.get(
    "/api/client/getByPolicyId/:id",
    verifyToken.authorize(["admin"]),
    async (request, response) => {
      try {
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
