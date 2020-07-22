"use strict";

const restify = require("restify");
const superagent = require("superagent");
if (!process.env.NODE_ENV) {
  require("dotenv").config({
    path: "config.local",
  });
}
const SpotifyAPI = require("./spotify_api");

const server = restify.createServer({
  name: "spotifyX3D",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const my_client_id = process.env.SPOTIFY_CLIENT_ID;
const my_client_secret = process.env.SPOTIFY_SECRET_ID;
const host_url = process.env.HOST_URL || "http://localhost:8080";
const redirect_uri = host_url + "/callback";
const spotifyAPI = new SpotifyAPI();

// Static server setup (public folder under /client)
server.get(
  "/client/*",
  restify.plugins.serveStatic({
    directory: __dirname + "/../",
    default: "index.html",
  })
);

server.get("/", function (req, res, next) {
  res.redirect(host_url + "/login", next);
});

// get login code, redirects through Spotify API to /callback
server.get("/login", function (req, res, next) {
  var scopes =
    "streaming user-modify-playback-state user-read-birthdate user-read-email user-read-private";
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      my_client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri),
    next
  );
});

// after authentication check
// get token and forward it to the client
// TODO add refresh token login
server.get("/callback", function (req, res, next) {
  let bearer_token = "";
  if (req.query.error) {
    res.redirect(host_url + "/login", next);
  } else {
    const auth = Buffer.from(my_client_id + ":" + my_client_secret).toString(
      "base64"
    );
    superagent
      .post("https://accounts.spotify.com/api/token")
      .send({
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
      })
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", "Basic " + auth)
      .end((err, token_res) => {
        if (err) {
          console.log(err);
        }
        bearer_token = token_res.body.access_token;
        res.redirect(
          host_url + "/client/index.html?token=" + bearer_token,
          next
        );
      });
  }
});

// The client request to start playback on that device
server.put("/play/:device_id", function (req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  spotifyAPI.startPlayback(token, req.params.device_id);
  res.status(200);
});

server.listen(process.env.PORT || 8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
