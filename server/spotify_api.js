/**
 * Basic Spotify web-API integration
 */

const superagent = require('superagent');

class SpotifyAPI {
    constructor() {
        this.base_spotify_url = 'https://api.spotify.com';

    }
    // start the playback on the selected device id
    startPlayback(bearer_token, device_id) {
        superagent.put(this.base_spotify_url + '/v1/me/player')
            .set('Authorization', 'Bearer ' + bearer_token)
            .send({ device_ids: [device_id] })
            .end((err, play_res) => {
                // console.log(play_res);
                if (err) {
                    console.log(err);
                }

            });
    }
    // get details of the currently playing track
    getCurrentlyPlaying(bearer_token) {
        return superagent.get(base_spotify_url + '/v1/me/player/currently-playing')
            .set('Authorization', 'Bearer ' + bearer_token)
            .end((err, curr_res) => {
                if (err) {
                    console.log(err);
                }
                return curr_res;
            })
    }
}
module.exports = SpotifyAPI;