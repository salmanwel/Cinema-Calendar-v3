import { Component, OnInit, ViewEncapsulation, AfterViewChecked  } from '@angular/core';
import {ReviewService} from '../services/reviews.service';
import {Review} from '../Review';

//import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import {Auth} from './../services/auth.service';

declare var Prism: any;

@Component({
  moduleId:module.id,
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

 reviews: Review[];
/*
 cloudinaryImage: any;
  uploader: CloudinaryUploader = new CloudinaryUploader(

    new CloudinaryOptions({ cloudName: 'kalakalareview', uploadPreset: 'vx02k4gp' })
  );

  */
  
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

}
