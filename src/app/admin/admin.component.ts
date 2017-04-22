import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import {Auth} from './../services/auth.service';
import {ReviewService} from '../services/reviews.service';
import {Review, ReviewWall, OtherRatings} from '../Review';

// Reactive Forms
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Customer, Address} from '../kalakala';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 @Input() review: Review;
    profile: any;
    reviews: any;
    
    public ReviewForm: FormGroup;

    constructor(private _reviewService: ReviewService,private auth:Auth, private fb: FormBuilder){
      this.profile = JSON.parse(localStorage.getItem('profile'));
      console.log(this.profile);

  }



  ngOnInit() {
    this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      });

    this.ReviewForm = this.fb.group({
            title: '',
            imgUrl: '',
            text: '',
            reviewer: '',
            timestamp: '',
            rating: '',
            otherRatings: this.fb.array([
                this.initOtherRatings(),
            ])
        });
   
  }

  initOtherRatings() {
        // initialize our ratings
        return this.fb.group({
            reviewer:'',
            rating:'',
            otherReviewImgUrl:''
        });
    }

    addAddress() {
    // add ratings to the list
    const control = <FormArray>this.ReviewForm.controls['otherRatings'];
    control.push(this.initOtherRatings());
}

removeAddress(i: number) {
    // remove ratings from the list
    const control = <FormArray>this.ReviewForm.controls['otherRatings'];
    control.removeAt(i);
}

  authenticateUsers(profile){
    if(profile.email=='smsalman7@gmail.com'){
      return true;
    }else{
      return false;
    }
  }

  save(model: Review) {
        // call API to save customer
        console.log(model);
     

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
    const formModel = this.ReviewForm.value;

     const otherRatingsDeepCopy: OtherRatings[] = formModel.otherRatings.map(
      (otherRatings: OtherRatings) => Object.assign({}, otherRatings)
    );
    
    const saveReview: any = {
      
      title: formModel.title as string,
      otherRatings:otherRatingsDeepCopy
      
     
    };

    return saveReview;
    }

  }

  


