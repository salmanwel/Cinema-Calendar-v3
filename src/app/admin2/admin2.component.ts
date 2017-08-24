import { Component, Input,OnInit } from '@angular/core';
import {AdminComponent} from '../admin/admin.component';
import {ReviewService} from '../services/reviews.service';
import {Review, ReviewWall, OtherRatings} from '../Review';
import {
    Routes,
    RouterModule,
    Router,
    ActivatedRoute
} from '@angular/router';
import {Auth} from './../services/auth.service';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
    Customer,
    Address
} from '../kalakala';
import {
    CloudinaryOptions,
    CloudinaryUploader
} from 'ng2-cloudinary';


@Component({
  moduleId: module.id,
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {

 @Input() review: Review;
  reviews: any;
  profile: any;
  imageList: string[] = [];
  imageId: any;
  image_UrlCopy: any;
  imageStatus: number []= [];
  ratingsCount: number =0;

   public ReviewForm: FormGroup;

       uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({
            cloudName: 'kalakalareview',
            uploadPreset: 'vx02k4gp'
        })
    );


  constructor(private _reviewService: ReviewService, private router:ActivatedRoute, private auth: Auth,
        private fb: FormBuilder, private router1: Router) {
   
     this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile);

            
        let imageCounter: number = 0;



        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {

            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            console.log("Status", status);


            this.imageList[imageCounter] = res.public_id;
            this.imageStatus[imageCounter]= status
           // this.ratingsCount=imageCounter;
            imageCounter = imageCounter + 1;

            return {
                item,
                response,
                status,
                headers
            };
        };

   }

  ngOnInit() {

     this.ReviewForm = this.fb.group({            
           
            otherRatings: this.fb.array([
                this.initOtherRatings(),
            ])
        });
  

    

    let title: string;
    let id: any;
    
    title=this._reviewService.getTitleData();
  //  console.log("Got it dude",title);
  
  

     setTimeout(() => 
{

   this.reviews = [];
    this._reviewService.getReviews()
      .subscribe(reviews => {
       // console.log(reviews);
        this.reviews = reviews;
        for (let review of this.reviews){
       if(title == review.title){
       id=review._id;
      
} 
        }
  
    if(id){
   console.log("My ID",id);
     this._reviewService.getReview(id).subscribe(review => {
                this.review = review;
                console.log(this.review);
     });
    }

      });
}
,
this.timeout);
    



   
  }

      authenticateUsers(profile) {
        if (profile.email == 'smsalman7@gmail.com') {
            return true;
        } else {
            return false;
        }
    }


    initOtherRatings() {
        // initialize our ratings
        return this.fb.group({
            reviewer:'',
            rating:'',
            otherReviewImgUrl:''
        });
    }

        addOtherRatings() {
        // add ratings to the list
        const control = < FormArray > this.ReviewForm.controls['otherRatings'];
        control.push(this.initOtherRatings());
        this.ratingsCount=this.ratingsCount+1;
    }

    removeOtherRatings(i: number) {
        // remove ratings from the list
        const control = < FormArray > this.ReviewForm.controls['otherRatings'];
        control.removeAt(i);
        this.ratingsCount=this.ratingsCount-1;
    }


     timeout: number =3000;

     save(model: Review) {
        // call API to save customer

       console.log("Inside Save",this.timeout);
       console.log("ratingsCount",this.ratingsCount);

        var result;
        var reactReviews: any;

        this.uploader.uploadAll();

        setTimeout(() => {
                
                console.log("Inside Timeout");

                 if (this.imageStatus[this.ratingsCount] ==200){

                             console.log("Image upload successful");
                             console.log("Timeout if",this.timeout);

                reactReviews = this.prepareSaveReview();
               // console.log("After Prepare Save",reactReviews.otherRatings);
                
                result = this._reviewService.updateReview(reactReviews).
                subscribe(x => {
                    this.review.otherRatings=reactReviews.otherRatings;
                });



                
                let title_params: string;
                title_params = this.review.title as string,

                    this.navigateToAdmin3(title_params);
                 }

                        else {
                            this.timeout=this.timeout+1000;
                            console.log("Timeout Else",this.timeout);
                            this.save(reactReviews);
                        }
                    
                     
            },
            this.timeout);

    }


    prepareSaveReview(): Review {
      
        let counter = 0;

        const formModel = this.ReviewForm.value;
        // const formgroupModel= this.reviewwall.value;
        this.image_UrlCopy = this.imageList;
        console.log("Image URL",this.image_UrlCopy);


       for (let entry of formModel.otherRatings){
           
           console.log("Inside for",entry);
           formModel.otherRatings[counter].otherReviewImgUrl=this.image_UrlCopy[counter];
           counter = counter + 1;
           
       }

       // formModel.otherRatings[0].otherReviewImgUrl=this.image_UrlCopy;
       
        console.log("Other ratings",formModel.otherRatings);
       // console.log("Other ratings url",formModel.otherRatings.otherReviewImgUrl);

        const otherRatingsDeepCopy: OtherRatings[] = formModel.otherRatings.map(
            (otherRatings: OtherRatings) => Object.assign({}, otherRatings)
        );



        const saveReview: any = {
            _id: this.review._id,
            otherRatings: otherRatingsDeepCopy
           

        };

        return saveReview;

    }

navigateToAdmin3(title) {



        //   console.log(this.after_id._id);
        //  console.log("ID after",title);
        this._reviewService.sendTitleData(title);

        console.log("Navigations");
        this.router1.navigate(['/admin3']);



    }

}
