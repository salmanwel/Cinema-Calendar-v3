import { Component, OnInit } from '@angular/core';
import {Auth} from './../services/auth.service';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  reviews: Review[];

  constructor(private _reviewService: ReviewService, private auth: Auth){

/*
     this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
    this.cloudinaryImage = JSON.parse(response);
    console.log(this.cloudinaryImage);
    console.log(item);
    console.log(status);
    console.log(headers);
    return {item, response, status, headers};
     };

     */
  }
  
  ngOnInit(){
    this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      });

    
  }

  editReview(event, review){
    console.log("Inside Edit Review");
  }

  deleteReview(review){
       var reviews = this.reviews;
      console.log("Delete TS");
      this._reviewService.deleteReview(review._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < reviews.length; i++){
            if(reviews[i]._id == review._id){
              reviews.splice(i, 1);
            }
          }
        }
      }) 

    window.location.reload();
    }

}
