    var fs = require('fs');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'kalakalareview',
  api_key: '393826947956924',
  api_secret: 'z8Dbfe82KoEaATbHJOONgveR5sE'
});


    uploadImage(imgFile)
    {
        console.log("Inside Image Service",imgFile);
        
        
cloudinary.uploader.upload(imgFile, function(result) { 
  console.log(result) 
});


    }
    