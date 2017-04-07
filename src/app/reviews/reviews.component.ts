import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

@Component({
  moduleId:module.id,
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

 reviews: Review[];
  
  constructor(private _reviewService: ReviewService){
    
  }
  
  ngOnInit(){
    this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      });
  }

}
