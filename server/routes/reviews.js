var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds147900.mlab.com:47900/moviemarket',['reviews']);

var fs = require('fs');
// logging


var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

// Get Reviews

router.get('/reviews', function(req, res, next){
    db.reviews.find(function(err,reviews){
        if(err){ 
            res.send(err);
        } else{
            res.json(reviews);
        }
    });
});


// Get single Review

router.get('/review/:id', function(req, res, next){
    db.reviews.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },function(err,review){
        if(err){ 
            res.send(err);
        } else{
            res.json(review);
        }
    });
});

// Get last updated Review


router.get('/review/:id', function(req, res, next){
    db.reviews.findOne({
        title: mongojs.ObjectId(req.params.id)
    },function(err,review){
        if(err){ 
            res.send(err);
        } else{
            res.json(review);
        }
    });
});




// Save review
router.post('/review', function(req, res, next){
    console.log("Inside Server");
    console.log(req.body);
    log_file.write(util.format(req));
    var review = req.body;
     
        db.reviews.save(review, function(err, result){
            if(err){
                res.send(err); 
            } else {
               // console.log("Inside Post",result);
                res.json(result);
            }
        });
    
});

// Update review
router.put('/review/:id', function(req, res, next){

    console.log("Inside server");
    var review = req.body;
    var updObj = {};
    
    
        
        console.log("Server data of update",review);
    
   
        db.reviews.update({
            _id: mongojs.ObjectId(req.params.id)} , {$set: {"otherRatings": review} }, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
);

// Delete review
router.delete('/review/:id', function(req, res, next){
    console.log("Inside Server for delete");
    db.reviews.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err, result){
        if(err){
            res.send(err); 
        } else {
            res.json(result);
        }
    });
});






module.exports = router;