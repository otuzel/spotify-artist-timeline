const axios = require('axios');
// function SpotifyApi(credentials) {
//   this.credentials = credentials;
// }
// function requestAccessToken() {
//   return axios.request({
//     url: spotifyTokenUrl,
//     method: 'post',
//     params: {
//       grant_type: 'client_credentials'
//     },
//     headers: {
//       'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
//     },
//   });
// }

// function getAccessToken() {
//   return accessToken;
// }

// function search(query, types, accessToken) {
//   return axios.request({
//     url: spotifySearchUrl,
//     method: 'get',
//     params: {
//       type: types.join(','),
//       q: query
//     },
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     },
//   });
// }

// function searchArtist(artist) {
//   return search(artist, ['artist'], accessToken);
// }

module.exports = {
  settings: {
    spotifyTokenUrl: 'https://accounts.spotify.com/api/token',
    spotifySearchUrl: 'https://api.spotify.com/v1/search',
    clientId: '878145fec83c4313a22b61344490f487',
    clientSecret: 'f28995425f7e48cc93e58419d82a795b',
    accessToken: ''
  },
  grantAccess: function() {
    console.log('grantAccess:', this.getAccessToken());
    return this.getAccessToken() ? Promise.resolve() : this.requestAccessToken();
  },
  requestAccessToken: function() {
    console.log('requestAccessTokens');
    return axios.request({
      url: this.settings.spotifyTokenUrl,
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(this.settings.clientId + ':' + this.settings.clientSecret).toString('base64')
      },
    });
  },
  getAccessToken: function() {
    return this.settings.accessToken;
  },
  setAccessToken: function(accessToken) {
    console.log('set access token... ', accessToken);
    this.settings.accessToken = accessToken;
  },
  search: function(query, types, accessToken) {
    return axios.request({
      url: this.settings.spotifySearchUrl,
      method: 'get',
      params: {
        type: types.join(','),
        q: query
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  },
  searchArtist: function(artist) {
    console.log('searchArtist with accessToken: ', this.settings.accessToken);
    return this.search(artist, ['artist'], this.settings.accessToken);
  }
}
