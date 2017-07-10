var express = require('express');
var uploadRouter = express.Router();
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// logging


var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

/*
console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
*/
// Cloudinary

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'kalakalareview',
  api_key: '393826947956924',
  api_secret: 'z8Dbfe82KoEaATbHJOONgveR5sE'
});


uploadRouter.post('/upload', multipartMiddleware,function(req, res){
  console.log("Inside Upload.js",req);
  log_file.write(util.format(req.files.image.path));
  console.log(req.files.image.path);
  
 // log_file.write(util.format(res));
    
});


var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds147900.mlab.com:47900/moviemarket',['reviews']);




// Get Reviews
uploadRouter.get('/reviews', function(req, res, next){
    db.reviews.find(function(err,reviews){
        if(err){ 
            res.send(err);
        } else{
            res.json(reviews);
        }
    });
});

module.exports = uploadRouter;


/**console.log(req.files);
   // console.log(res);
  var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
    , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });
    console.log(imageStream);
  imageStream.on('data', cloudStream.write).on('end', cloudStream.end); */