// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const reviews = require('./server/routes/reviews');

const imgUpload = require('./server/routes/upload');
//console.log("Server",imgUpload);

const app = express();


// Cloudinary



var fs = require('fs');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'kalakalareview',
  api_key: '393826947956924',
  api_secret: 'z8Dbfe82KoEaATbHJOONgveR5sE'
});


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', reviews);

app.use('/v1', imgUpload);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);


// Cloudinary

/*

cloudinary.uploader.upload("car1.png", function(result) { 
  console.log(result) 
});
*/



/**
 * Listen on provided port, on all network interfaces.
 * 
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));
