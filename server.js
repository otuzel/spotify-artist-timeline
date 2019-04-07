const express = require('express');
const path = require('path');
const app = express();

const apiRouter = require('./server/routes/api');
app.use(express.static(path.join(__dirname, 'dist/spotify-artist-timeline')));

app.use('/api', apiRouter);

// Catch all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/spotify-artist-timeline/index.html'));
});


const port = process.env.PORT || 4600;


app.listen(port, (req, res) => {
  console.log(`running on port ${port}`);
});
