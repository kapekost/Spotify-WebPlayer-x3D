const RequestHandlers = require("./requestHandlers");
const superagent = require("superagent");
module.exports = class ServerRoutes {
  constructor(server, restify) {
    this.requestHandlers = new RequestHandlers();
    this.baseURL = "/api";
    this.restify = restify;
    this.server = server;
  }

  attachBaseRoutes() {
    this.server.get(
      this.baseURL + "/login",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.handleSpotifyLogin,
        },
      ])
    );

    // after authentication check
    // get token and forward it to the client
    // TODO add refresh token login
    this.server.get(
      this.baseURL + "/callback",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.callbackHandler,
        },
      ])
    );
    // The client request to start playback on that device
    this.server.put(
      this.baseURL + "/play/:device_id",
      this.restify.plugins.conditionalHandler([
        {
          version: ["1.0.0", "2.0.0"],
          handler: this.requestHandlers.handleStartPlayback,
        },
      ])
    );
  }
};
