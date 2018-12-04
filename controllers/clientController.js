var clientService = require("../domain/clientService");

module.exports = function(app) {
  app.get("/api/client/getClients", function(req, res) {
    clientService
      .getClients()
      .then(clients => {
        res.send(clients);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
};
