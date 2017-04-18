import { Component } from '@angular/core';
import {ReviewService} from './services/reviews.service';
import {Auth} from './services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ReviewService]
})
export class AppComponent {
  constructor(private auth:Auth){
    
  }
  
}
