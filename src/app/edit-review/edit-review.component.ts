import { Component, OnInit, Input, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ReviewService} from '../services/reviews.service';
import {Review,  ReviewWall, OtherRatings} from '../Review';
import {Auth} from './../services/auth.service';

import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Customer, Address} from '../kalakala';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

     @Input() review: Review;
    profile: any;
    reviews: any;
    
     
    
    public ReviewForm: FormGroup;

  constructor(private router:ActivatedRoute, 
        private _reviewService:ReviewService,
        private auth: Auth,
        private fb: FormBuilder) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
            let id = params['id'];
            this._reviewService.getReview(id).subscribe(review => {
                this.review = review;
            });
        });

          this.ReviewForm = this.fb.group({
            title: '',
            imgUrl: '',
            text: '',
            reviewer: '',
            timestamp: '',
            rating: '',
          
            wallImgUrl:'',
            tagline:'',
            watchable:'',
            
           
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

      

}
