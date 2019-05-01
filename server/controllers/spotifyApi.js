const axios = require('axios');
module.exports = {
  settings: {
    spotifyTokenUrl: 'https://accounts.spotify.com/api/token',
    spotifySearchUrl: 'https://api.spotify.com/v1/search',
    spotifyArtistsUrl: 'https://api.spotify.com/v1/artists/',

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
    console.log('Set access token: ', accessToken);
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
      }
    });
  },
  searchArtist: function(artist) {
    console.log('Search artist with accessToken: ', this.settings.accessToken);
    return this.search(artist, ['artist'], this.settings.accessToken);
  },
  getAlbums: function(artistId) {
    console.log('Get albums with accessToken: ', this.settings.accessToken);
    return axios.request({
      url: this.settings.spotifyArtistsUrl + artistId + '/albums',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${this.settings.accessToken}`
      },
      params: {
        limit: 50
      }
    });
  }
}
