import { Component, OnInit } from '@angular/core';
import {Auth} from './../services/auth.service';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    profile: any;
    reviews: any;
    samplereview: any;

    rowRate: any;

    constructor(private _reviewService: ReviewService,private auth:Auth){
      this.profile = JSON.parse(localStorage.getItem('profile'));
      console.log(this.profile);

      this.rowRate=[{
        name:"Reviewer",
        rating:"Rating"
      }];
  }

  ngOnInit() {
    this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      });
   
  }

  authenticateUsers(profile){
    if(profile.email=='smsalman7@gmail.com'){
      return true;
    }else{
      return false;
    }
  }

  addOneRow(){
       this.rowRate.push({
         name:"Reviewer",
        rating:"Rating"
       })

  }

  addReview(event,  movieTitle, reviewTagline, reviewDesc, reviewer, movieRating){
    console.log(movieTitle.value, reviewTagline.value, reviewDesc.value, reviewer.value, movieRating.value);
    //console.log("rate",rateReviewer.value,rateRating.value);

    var result;
    var newReview = {
      title: movieTitle.value, 
      imgUrl: "",
      text: reviewTagline.value, 
      description: reviewDesc.value, 
      reviewer: reviewer.value, 
      timestamp:"",
      rating: movieRating.value,

      reviewwall:{
        wallImgUrl:"",
        tagline:"",
        watchable:'5',
        otherRatings:[
          {
          reviewer:"",
          rating:"",
          otherReviewImgUrl:""
        }]
      }
    
    };
  console.log(newReview);
    result= this._reviewService.saveReview(newReview);
  
      result.subscribe(x => {
        this.reviews.push(newReview);
       
      });

  }

  testModel(rateReviewer, rateRating){
    console.log("rate",rateReviewer.value,rateRating.value);
  }

}
