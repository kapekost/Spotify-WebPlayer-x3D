# X3D Spotify Music Player

3D visual music player for WebGL compatible browsers.
Tested on Oculus GO, mobile and desktop browsers

## sample

https://spotifyx3d.herokuapp.com/

## About

- create a Spotify App and get your Client ID and Secret ID
- The App is using the Spotify web SDK to get a token
- The nodeJS server will do the redirections in a way to provide the token from the client to the server
- The server will setup the callback url for the Spotify service, will connect to spotify server to get your client id and device to trigger automatically the playback
- The client triggers commands to play next/previous and pause the playback
- Using the `unsplash API` the app will download a different background image for each song
- NJoy

## Development

- create a config file in the root directory `config.local` and set

```
SPOTIFY_CLIENT_ID=<your client id here>
SPOTIFY_SECRET_ID=<your spotify secret id here>
HOST_URL=<your reachable host url (for dev I used ngrok)>
```

- npm install
- npm run start
- navigate to `http://localhost:8080/`

### Background image

in `client/index.js:186` set your `unsplash` client_id
or replace the return of the `FetchAndUpdateBackgroundImage()` function to provide the background you wish
