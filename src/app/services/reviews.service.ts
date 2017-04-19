import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewService{
    constructor(private _http:Http){
        
    }
    
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

    saveReactReview(review){
        console.log("Inside React Service");
        console.log(review);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/review', JSON.stringify(review), {headers: headers})
            .map(res => res.json()
             );

    }
}

