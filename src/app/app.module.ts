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

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);

}

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    ReviewComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule
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
