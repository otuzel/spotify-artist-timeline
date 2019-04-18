const spotifyApi = require('./spotifyApi');
module.exports.search = (req, res) => { 
  return spotifyApi.grantAccess()
    .then(response => { 
      // if there's not response, then we already have the access token
      return response ? spotifyApi.setAccessToken(response.data.access_token) : Promise.resolve();
    })
    .then(() => spotifyApi.searchArtist('metallica'))
    .then(response => res.json(response.data))
    .catch(err => {
      console.log(err.response.data);
      res.send(err.response.data);
    });

}