import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

export interface myData {
   name:string;
}


@Injectable()
export class ReviewService{
    constructor(private _http:Http){
        
    }

    sharingData: myData={name:""};
    
    getReviews(){
        return this._http.get('/api/reviews')
            .map(res => res.json());
    }

    getReview(id){
        return this._http.get('api/review/'+id)
            .map(res => res.json());
    }


 
    saveReview(review){
        console.log("Inside Service");
        console.log(review);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/review', JSON.stringify(review), {headers: headers})
            .map(res => res.json()
             );
    }


    updateReview(review){
        var id=review._id;
        console.log("Id is",review.otherRatings);
        console.log("Update Service");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/review/'+id, JSON.stringify(review.otherRatings), {headers: headers})
            .map(res => res.json());
    }


    updateMemesReview(review){
        var id=review._id;
        console.log("Meme data",review.Memes);
        console.log("Update Service");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/review/'+id, JSON.stringify(review.Memes), {headers: headers})
            .map(res => res.json());
    }
    
    deleteReview(id){
        console.log("Delete Service");
        return this._http.delete('/api/review/'+id)
            .map(res => res.json());
    }

    sendTitleData(title){
     // console.log('save data function called' + title + this.sharingData.name);
      this.sharingData.name=title; 
 
    }

    getTitleData (){

       // console.log('get data function called');
    return this.sharingData.name;

    }
}

