import { Routes } from '@angular/router';
import path from 'path';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'posts', component: AllPostComponent },
  { path: 'posts/new', component: NewPostComponent },
];
