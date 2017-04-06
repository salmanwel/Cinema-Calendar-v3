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

}