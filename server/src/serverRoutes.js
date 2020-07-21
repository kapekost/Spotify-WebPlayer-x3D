const RequestHandlers = require("./requestHandlers");

module.exports = class ServerRoutes {
  constructor(server, restify, storage) {
    this.requestHandlers = new RequestHandlers(storage);
    this.baseURL = "/api";
    this.restify = restify;
    this.server = server;
  }

  attachBaseRoutes() {
    this.server.get(
      this.baseURL + "/document/:q",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.getDocument,
        },
      ])
    );
    this.server.post(
      this.baseURL + "/login",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.getUser,
        },
      ])
    );
  }
};
