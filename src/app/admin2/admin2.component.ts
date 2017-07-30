import { Component, Input,OnInit } from '@angular/core';
import {AdminComponent} from '../admin/admin.component';
import {ReviewService} from '../services/reviews.service';
import {Review, ReviewWall, OtherRatings} from '../Review';
import {Router, ActivatedRoute} from '@angular/router';
import {Auth} from './../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {

 @Input() review: Review;
  reviews: any;

  constructor(private _reviewService: ReviewService, private router:ActivatedRoute, private auth: Auth) {
   
    

   }

  ngOnInit() {

    let title: string;
    let id: any;
    
    title=this._reviewService.getTitleData();
    console.log("Got it dude",title);
  
  this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
        for (let review of this.reviews){
       console.log("Review Title",review.title);
       console.log("My title",title);
       if(title == review.title){
       console.log("Title",review.title);
       console.log("ID",review._id);
       id=review._id;
      
} 
        }
      });

      setTimeout(() => 
{
    console.log("My ID",id);
     this._reviewService.getReview(id).subscribe(review => {
                this.review = review;
                console.log(this.review);
     });

},
5000);

   




  }

}
