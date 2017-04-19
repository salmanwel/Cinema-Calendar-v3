import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import {Auth} from './../services/auth.service';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

// Reactive Forms
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 @Input() review: Review;
    profile: any;
    reviews: any;
    samplereview: any;

    rowRate: any;

    constructor(private _reviewService: ReviewService,private auth:Auth, private fb: FormBuilder){
      this.profile = JSON.parse(localStorage.getItem('profile'));
      console.log(this.profile);

      this.rowRate=[{
        name:"Reviewer",
        rating:"Rating"
      }];

      // Create Reactive Forms
      this.createForm();
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

  // Reactive Forms
   reviewForm: FormGroup;

  createForm() {
    this.reviewForm = this.fb.group({
      movieTitle: '',
      reviewTagline: '',
      reviewDesc: '',
      reviewer: '',
      movieRating: ''
    });
  }

onSubmit() {

    var result;
    var reactReviews: any;

    reactReviews = this.prepareSaveReview();
    console.log(reactReviews);
    
      result= this._reviewService.saveReactReview(reactReviews);
  
      result.subscribe(x => {
        this.reviews.push(reactReviews);
       
      });
    
}
    
  

  prepareSaveReview(): Review {
    const formModel = this.reviewForm.value;
    
    const saveReview: Review = {
      
      title: formModel.movieTitle as string,
      imgUrl: "" as string,
      text: formModel.reviewTagline as string,
      description: formModel.reviewDesc as string,
      reviewer: formModel.reviewer as string,
      timestamp:"" as string,
      rating: formModel.movieRating as number,
      reviewwall:{
        wallImgUrl:"" as string,
        tagline:"" as string,
        watchable:5 as number,
        otherRatings:[
          {
          reviewer:"" as string,
          rating:4 as number,
          otherReviewImgUrl:"" as string
        }]
      },
      memes:[
        {
        memetext:"" as string,
        memeImgUrl:"" as string,
        claps:4 as number
      }],
    comments:[
        {
        userId:"" as string,
        comment:"" as string
    }]
     
    };

    return saveReview;
  }


}
