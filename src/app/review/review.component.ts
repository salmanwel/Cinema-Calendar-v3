import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

import {CloudinaryImageComponent} from 'ng2-cloudinary';

import {Auth} from './../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

   review: Review[];

    constructor(
        private router:ActivatedRoute, 
        private _reviewService:ReviewService,
        private auth: Auth){
        
    }
    
    ngOnInit(){
        this.router.params.subscribe((params) => {
            let id = params['id'];
            this._reviewService.getReview(id).subscribe(review => {
                this.review = review;
            });
        });
    }

}
