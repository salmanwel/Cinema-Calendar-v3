import { Component, OnInit, Input, EventEmitter, Output, OnChanges  } from '@angular/core';
import {Auth} from './../services/auth.service';
import {ReviewService} from '../services/reviews.service';
import {Review, ReviewWall, OtherRatings} from '../Review';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

// Reactive Forms
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import {Routes, RouterModule, Router} from '@angular/router';

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
    after_id:any;
    imageId: any;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'kalakalareview', uploadPreset: 'vx02k4gp' })
    );

//
   


  //
    
    public ReviewForm: FormGroup;
   // public reviewwall: FormGroup;
  
    constructor(private _reviewService: ReviewService,private auth:Auth, private fb: FormBuilder, private router: Router){

    

      this.profile = JSON.parse(localStorage.getItem('profile'));
      console.log(this.profile);

      let imageList: number[]=[];
      let imageNameList: string[]=[];
      let imageCounter: number=1;

      this.uploader.onAfterAddingFile=(item):any=>{

        console.log("After adding file");
        console.log(item);


      }

      

      

      

      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {    

            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            console.log("Status",status);
           // console.log("Item",item.FileItem.file.name);
            console.log(this.imageId);

            imageList[imageCounter]=res.public_id;
         //   imageNameList[imageCounter]=item.FileItem.file.name;
            imageCounter=imageCounter+1;
           console.log(imageCounter);
           console.log(imageList);
           console.log(imageNameList);
            return { item, response, status, headers };
        };

        

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
            description:'',
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
        
     

        var result;
        var reactReviews: any;

        reactReviews = this.prepareSaveReview();
        console.log(reactReviews);
       
        // Upload Images to Cloudinary
        
        this.uploader.uploadAll();

        result= this._reviewService.saveReactReview(reactReviews);
       
        console.log(reactReviews);

        result.subscribe(x => {
        this.reviews.push(reactReviews);  
      });

        const formModel = this.ReviewForm.value;
      let title_params : string;
      title_params= formModel.title as string,
  
      this.navigateToAdmin2(title_params);

   
    }

        

    prepareSaveReview(): Review {
      var date_now= new Date();
      console.log(date_now);
      
    const formModel = this.ReviewForm.value;
   // const formgroupModel= this.reviewwall.value;

     const otherRatingsDeepCopy: OtherRatings[] = formModel.otherRatings.map(
      (otherRatings: OtherRatings) => Object.assign({}, otherRatings)
    );

    const reviewwallDeepCopy: ReviewWall = {
      wallImgUrl: formModel.wallImgUrl as string,
      tagline: formModel.tagline as string,
      watchable: formModel.watchable as number
    }

   
 
    console.log("Review wall",reviewwallDeepCopy.wallImgUrl);

    const saveReview: any = {
      
      title: formModel.title as string,
      imgUrl: formModel.imgUrl as string,
      text: formModel.text as string,
      description: formModel.description as string,
      reviewer: formModel.reviewer as string,
      timestamp: formModel.timestamp as string,
      rating: formModel.rating as number,
      
      reviewwall:reviewwallDeepCopy,

      otherRatings:otherRatingsDeepCopy
      
     
    };

    return saveReview;

    
    
    }

   
  

    navigateToAdmin2(title){

     

   //   console.log(this.after_id._id);
    console.log("ID after",title);
    this._reviewService.sendTitleData(title);

    setTimeout(() => 
{
    this.router.navigate(['/admin2']);
},
5000);

     
    }
    

  }

  


