window.onSpotifyWebPlaybackSDKReady = () => {
  const token = getUrlParams("token");
  if (!token) {
    window.location.replace("/login");
  }
  const player = new Spotify.Player({
    name: "SpotifyX3D",
    getOAuthToken: (cb) => {
      cb(token);
    },
  });
  window.player = player;
  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    setX3DConneted(false);
    setMainText("initialization error");
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    setX3DConneted(false);
    setMainText("authentication error");
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    setX3DConneted(false);
    setMainText("account error");
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
    setMainText("playback error");
  });

  // Playback status updates
  player.addListener("player_state_changed", (state) => {
    console.log(state);
    player.getCurrentState().then((state) => {
      if (!state) {
        console.log("User is not playing music through the Web Playback SDK");
        return;
      }
      let {
        current_track,
        next_tracks: [next_track],
        previous_tracks: [prev2_track, prev_track],
      } = state.track_window;
      if (current_track.album) {
        setImageTexture(current_track.album.images[0].url, "main");
      }
      if (next_track.album) {
        setImageTexture(next_track.album.images[0].url, "next");
      }
      if (prev_track) {
        setImageTexture(prev_track.album.images[0].url, "prev");
      }
      setMainText(current_track.name);
      FetchAndUpdateBackgroundImage();
    });
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    setMainText("ready");
    fetch("/play/" + device_id, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      }); // parses response to JSON
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
    setMainText("not ready");
    setX3DConneted(false);
  });

  // Connect to the player!
  player.connect().then(() => {
    console.log("Connected to spotify");
    setMainText("connected");
    setX3DConneted(true);
  });
};

function setMainText(text) {
  const mainTextElement = document.getElementById("mainText");
  mainTextElement.setAttribute("string", text);
}
/**
 * Set the image url to replace/create the texture for the PlayBoxes
 * @param {string} image_url
 * @param {string} box='main' the name of the box to change
 */
function setImageTexture(image_url, box = "main") {
  let boxId = "";
  if (box === "main") boxId = "playBoxAppearance";
  if (box === "next") boxId = "playBoxNextAppearance";
  if (box === "prev") boxId = "playBoxPrevAppearance";
  const playBoxAppearance = document.getElementById(boxId);
  const materialElement = document.createElement("Material");
  materialElement.setAttribute("transparency", "0.3");
  const imageTextureElement = document.createElement("ImageTexture");
  imageTextureElement.setAttribute("url", image_url);
  playBoxAppearance.replaceChild(
    imageTextureElement,
    playBoxAppearance.childNodes[0]
  );
  playBoxAppearance.append(materialElement);
}

/**
 * Update the x3d canvas background image
 * @param {string} imageUrl the url of the image
 */
function setImageBackground(imageUrl) {
  document.getElementById("3dBackground").setAttribute("backUrl", imageUrl);
}
/**
 * Display connection to Spotify
 * Change the color of the main box to red (disconnected) or green (connected)
 * @param {Boolean}=true display connected or disconnected node */
function setX3DConneted(connected = true) {
  const playBoxAppearance = document.getElementById("playBoxConnected");
  connected
    ? playBoxAppearance.setAttribute("diffuseColor", "0 1 0")
    : playBoxAppearance.setAttribute("diffuseColor", "1 0 0");
}

document.onload = function () {
  // Handle mouseover/click event on a shape
  $(document).ready(function () {
    //Add a onclick callback to every shape
    $("shape").each(function () {
      $(this).attr("onclick", "handleSingleClick(this)");
    });
  });
};

function handleSingleClick(shape) {
  switch ($(shape)[0].id) {
    case "playBox":
      window.player.togglePlay().then(() => {
        console.log("Toggled playback!");
      });
      break;
    case "playBox_next":
      window.player.nextTrack().then(() => {
        console.log("next!");
      });
      break;
    case "playBox_prev":
      window.player.previousTrack().then(() => {
        console.log("previous!");
      });
      break;
    default:
      console.log("nothing");
      break;
  }
}

/**
 * JavaScript Get URL Parameter
 *
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
 */
function getUrlParams(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");

  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : null;
}

// Unsplash
/**
 * Fetch an image from Unsplash and update the x3d background
 */
function FetchAndUpdateBackgroundImage() {
  const un_client_id = "<your unsplash Id here";
  fetch(
    "https://api.unsplash.com/photos/random?orientation=landscape&client_id=" +
      un_client_id,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Client-ID " + un_client_id,
        "Accept-Version": "v1",
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      setImageBackground(res.urls.regular);
    });
}
