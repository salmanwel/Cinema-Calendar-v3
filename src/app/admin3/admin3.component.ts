import { Component, Input,OnInit } from '@angular/core';
import {AdminComponent} from '../admin/admin.component';
import {ReviewService} from '../services/reviews.service';
import {Review, ReviewWall, Memes} from '../Review';
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
  selector: 'app-admin3',
  templateUrl: './admin3.component.html',
  styleUrls: ['./admin3.component.css']
})
export class Admin3Component implements OnInit {

 @Input() review: Review;
  reviews: any;
  profile: any;
  imageList: string[] = [];
  imageId: any;
  image_UrlCopy: any;
  imageStatus: number []= [];
  memesCount: number =0;

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

                let imageNameList: string[] = [];
        let imageCounter: number = 0;



        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {

            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            console.log("Status", status);


            this.imageList[imageCounter] = res.public_id;

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
           
            Memes: this.fb.array([
                this.initMemes(),
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
       console.log("Title",review.title);
       console.log("ID",review._id);
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

    

},
this.timeout);

   
  }

      authenticateUsers(profile) {
        if (profile.email == 'smsalman7@gmail.com') {
            return true;
        } else {
            return false;
        }
    }


    initMemes() {
        // initialize our ratings
        return this.fb.group({
            memetext:'',
            claps: '',
            memeImgUrl:''
        });
    }

        addMemes() {
        // add ratings to the list
        const control = < FormArray > this.ReviewForm.controls['Memes'];
        control.push(this.initMemes());
        this.memesCount=this.memesCount+1;
    }

    removeMemes(i: number) {
        // remove ratings from the list
        const control = < FormArray > this.ReviewForm.controls['Memes'];
        control.removeAt(i);
        this.memesCount=this.memesCount-1;
    }


     timeout: number =3000;

     save(model: Review) {
        // call API to save customer

        console.log("Inside Save",this.timeout);
       console.log("ratingsCount",this.memesCount);

        var result;
        var reactReviews: any;

        this.uploader.uploadAll();

        setTimeout(() => {

            console.log("Inside Timeout");

                 if (this.imageStatus[this.memesCount] ==200){

                             console.log("Image upload successful");
                             console.log("Timeout if",this.timeout);

                reactReviews = this.prepareSaveReview();
                console.log("After Prepare Save",reactReviews.Memes);

                result = this._reviewService.updateMemesReview(reactReviews).
                subscribe(x => {
                    this.review.memes=reactReviews.Memes;
                });

                 }

                 else {
                            this.timeout=this.timeout+1000;
                            console.log("Timeout Else",this.timeout);
                            this.save(reactReviews);
                        }

                  /* 
                let title_params: string;
                title_params = this.review.title as string,

                    this.navigateToAdmin3(title_params);

            */
            },
            this.timeout);

    }


    prepareSaveReview(): Review {
      
        let counter = 0;

        const formModel = this.ReviewForm.value;
        // const formgroupModel= this.reviewwall.value;
        this.image_UrlCopy = this.imageList;
        console.log("Image URL",this.image_UrlCopy);


       for (let entry of formModel.Memes){
           
           console.log("Inside for",entry);
           formModel.Memes[counter].memeImgUrl=this.image_UrlCopy[counter];
           counter = counter + 1;
           
       }

       // formModel.otherRatings[0].otherReviewImgUrl=this.image_UrlCopy;
       
        console.log("Memes ",formModel.Memes);
       // console.log("Other ratings url",formModel.otherRatings.otherReviewImgUrl);

        const MemesDeepCopy: Memes[] = formModel.Memes.map(
            (Memes: Memes) => Object.assign({}, Memes)
        );



        const saveReview: any = {
            _id: this.review._id,
            Memes: MemesDeepCopy
           

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
