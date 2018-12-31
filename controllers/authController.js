var clientService = require("../service/clientService");
var authService = require("../service/authService");

module.exports = function(app) {
  app.post("/api/auth/requestToken", async (request, response, next) => {
    try {
      const clientByEmail = await clientService.findByEmail(request.body.email);
      if (clientByEmail != null) {
        const token = await authService.getToken(clientByEmail);
        response.send(token);
      }

      response.status(401).send("Unauthorized");
    } catch (error) {
      response.status(400).send(error.message);
    }
  });
};
