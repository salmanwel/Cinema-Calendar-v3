import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    OnChanges
} from '@angular/core';
import {
    Auth
} from './../services/auth.service';
import {
    ReviewService
} from '../services/reviews.service';
import {
    Review,
    ReviewWall,
    OtherRatings
} from '../Review';
import {
    CloudinaryOptions,
    CloudinaryUploader
} from 'ng2-cloudinary';

// Reactive Forms
import {
    Validators,
    FormArray,
    FormBuilder,
    FormGroup
} from '@angular/forms';

import {
    Routes,
    RouterModule,
    Router
} from '@angular/router';

import {
    Customer,
    Address
} from '../kalakala';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    @Input() review: Review;
    profile: any;
    reviews: any;
    after_id: any;
    imageId: any;
    image_UrlCopy: any;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({
            cloudName: 'kalakalareview',
            uploadPreset: 'vx02k4gp'
        })
    );


    public ReviewForm: FormGroup;
    // public reviewwall: FormGroup;
    imageList: string[] = [];
    imageStatus: number []= [];

    constructor(private _reviewService: ReviewService, private auth: Auth, private fb: FormBuilder, private router: Router) {



        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile);


        




    }



    ngOnInit() {

        this.reviews = [];
        this._reviewService.getReviews()
            .subscribe(reviews => {
                this.reviews = reviews;
            });


        this.ReviewForm = this.fb.group({
            title: '',
            imgUrl: '',
            text: '',
            description: '',
            reviewer: '',
            timestamp: '',
            rating: '',

            wallImgUrl: '',
            tagline: '',
            watchable: '',


            otherRatings: this.fb.array([
                this.initOtherRatings(),
            ])
        });

    }

    initOtherRatings() {
        // initialize our ratings
        return this.fb.group({
            reviewer: '',
            rating: '',
            otherReviewImgUrl: ''
        });
    }

    addAddress() {
        // add ratings to the list
        const control = < FormArray > this.ReviewForm.controls['otherRatings'];
        control.push(this.initOtherRatings());
    }

    removeAddress(i: number) {
        // remove ratings from the list
        const control = < FormArray > this.ReviewForm.controls['otherRatings'];
        control.removeAt(i);
    }

    authenticateUsers(profile) {
        if (profile.email == 'smsalman7@gmail.com') {
            return true;
        } else {
            return false;
        }
    }




    save(model: Review) {
        // call API to save customer



        var result;
        var reactReviews: any;

        this.uploader.uploadAll();

        setTimeout(() => {
                reactReviews = this.prepareSaveReview();

                result = this._reviewService.saveReview(reactReviews);


                result.subscribe(x => {
                    this.reviews.push(reactReviews);
                });



                const formModel = this.ReviewForm.value;
                let title_params: string;
                title_params = formModel.title as string;
                this.navigateToAdmin2(title_params);

                

                     console.log("Status of image",this.imageStatus[this.imageStatus.length-1]);
                         if (this.imageStatus[this.imageStatus.length-1] ==200){
                             console.log("Image upload successful");
                             
                         }
                        else{
                            console.log("Image upload Not successful");
                        }
                    
                     
            },
            2000);



    }




    prepareSaveReview(): Review {
        var date_now = new Date();
        console.log(date_now);

        const formModel = this.ReviewForm.value;
        // const formgroupModel= this.reviewwall.value;


        let reviewwallDeepCopy: ReviewWall = {
            wallImgUrl: "null",
            tagline: formModel.tagline as string,
            watchable: formModel.watchable as number
        };



        reviewwallDeepCopy = {
            wallImgUrl: this.imageList[1],
            tagline: formModel.tagline as string,
            watchable: formModel.watchable as number
        }

        this.image_UrlCopy = this.imageList[0];




        console.log("Review wall image", reviewwallDeepCopy.wallImgUrl);
        console.log('image Url', this.image_UrlCopy);



        const saveReview: any = {

            title: formModel.title as string,
            imgUrl: this.image_UrlCopy,
            text: formModel.text as string,
            description: formModel.description as string,
            reviewer: formModel.reviewer as string,
            timestamp: date_now,
            rating: formModel.rating as number,

            reviewwall: reviewwallDeepCopy


        };

        return saveReview;

    }




    navigateToAdmin2(title) {



        //   console.log(this.after_id._id);
        //  console.log("ID after",title);
        this._reviewService.sendTitleData(title);


        this.router.navigate(['/admin2']);



    }


}