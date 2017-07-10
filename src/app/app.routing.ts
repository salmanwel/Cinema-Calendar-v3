import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReviewsComponent} from './reviews/reviews.component';
import {ReviewComponent} from './review/review.component';
import {AdminComponent} from './admin/admin.component';
import {EditComponent} from './edit/edit.component';
import {EditReviewComponent} from './edit-review/edit-review.component';

import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [
    {
        path:'',
        component: ReviewsComponent
    },
    {
        path:'review/:id',
        component: ReviewComponent
    },
    {
        path:'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'edit',
        component: EditComponent,
        canActivate: [AuthGuard]
    },
     {
        path:'edit-review/:id',
        component: EditReviewComponent,
        canActivate: [AuthGuard]
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);