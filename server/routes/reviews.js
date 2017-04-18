var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds147900.mlab.com:47900/moviemarket',['reviews']);


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


// Save Review

// Save review
router.post('/review', function(req, res, next){
    console.log("Inside Server");
    console.log(req.body);
    var review = req.body;
     
        db.reviews.save(review, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    
});

// Update review
router.put('/review/:id', function(req, res, next){
    var review = req.body;
    var updObj = {};
    
    if(review.isCompleted){
       updObj.isCompleted = review.isCompleted;
    }
    
    if(review.text){
        updObj.text = review.text;
    }
    
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.reviews.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj, {}, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Delete review
router.delete('/review/:id', function(req, res, next){
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