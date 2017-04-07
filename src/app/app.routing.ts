import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReviewsComponent} from './reviews/reviews.component';
import {ReviewComponent} from './review/review.component';

const appRoutes: Routes = [
    {
        path:'',
        component: ReviewsComponent
    },
    {
        path:'review/:id',
        component: ReviewComponent
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);