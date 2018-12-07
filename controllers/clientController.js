var clientService = require("../domain/clientService");

module.exports = function(app) {
  app.get("/api/client/getByName/:name", function(req, res) {
    clientService
      .findByName(req.params.name)
      .then(clients => {
        res.send(clients);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.get("/api/client/getById/:id", function(req, res) {
    clientService
      .findById(req.params.id)
      .then(clients => {
        res.send(clients);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.get("/api/client/getByPolicyId/:id", function(req, res) {
    clientService
      .findByPolicyId(req.params.id)
      .then(clients => {
        res.send(clients);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
};
