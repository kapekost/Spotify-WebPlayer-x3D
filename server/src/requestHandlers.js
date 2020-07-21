const SpotifyAPI = require("./spotifyAPI");

module.exports = class RequestHandlers {
  constructor() {
    this.my_client_id = process.env.SPOTIFY_CLIENT_ID;
    this.my_client_secret = process.env.SPOTIFY_SECRET_ID;
    this.host_url = process.env.HOST_URL;
    this.redirect_uri = this.host_url + "/callback";
    this.spotifyAPI = new SpotifyAPI();
  }
  callbackHandler(req, res, next) {
    let bearer_token = "";
    if (req.query.error) {
      res.redirect(host_url + "/login", next);
    } else {
      const auth = Buffer.from(
        this.my_client_id + ":" + this.my_client_secret
      ).toString("base64");
      superagent
        .post(this.baseURL + "https://accounts.spotify.com/api/token")
        .send({
          code: req.query.code,
          grant_type: "authorization_code",
          redirect_uri: this.redirect_uri,
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
  }
  handleStartPlayback(req, res, next) {
    const token = req.headers["authorization"].split(" ")[1];
    this.spotifyAPI.startPlayback(token, req.params.device_id);
    res.status(200);
    next();
  }
  handleSpotifyLogin(req, res, next) {
    var scopes =
      "streaming user-modify-playback-state user-read-birthdate user-read-email user-read-private";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        this.my_client_id +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(this.redirect_uri),
      next
    );
  }
};
