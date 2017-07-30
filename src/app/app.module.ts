import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions  } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewComponent } from './review/review.component';

//Cloudinary
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { AdminComponent } from './admin/admin.component';

// Auth
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import {Auth} from './services/auth.service';
import {AuthGuard} from './auth.guard';

// Reactive
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { Admin2Component } from './admin2/admin2.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);

}

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    ReviewComponent,
    AdminComponent,
    EditComponent,
    EditReviewComponent,
    Admin2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    Auth,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
