const axios = require('axios');
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
const spotifySearchUrl = 'https://api.spotify.com/v1/search';


module.exports.search = (req, res) => {
  return axios.request({
    url: spotifyTokenUrl,
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
  })
  .then(response => {
    const accessToken = response.data.access_token;
    console.log(accessToken);
    return axios.request({
      url: spotifySearchUrl,
      method: 'get',
      params: {
        type: 'artist',
        q: 'metallica'
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
  })
  .then(response => {
    console.log(response)
    res.json(response.data);
  })
  .catch(err => {
    console.log(err.response.data);
    res.send(err.response.data);
  });
}
