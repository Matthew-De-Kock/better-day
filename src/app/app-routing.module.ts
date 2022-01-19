import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import {DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateNewUserComponent } from './pages/admin/create-new-user/create-new-user.component';
import { CreateJobCardComponent } from './pages/job-cards/create-job-card/create-job-card.component';

const routes: Routes = [

  {path: '', redirectTo : '/login',pathMatch: 'full'},

{path: 'login', component:LoginComponent},
{path: 'dashboard', component:DashboardComponent},
{path: 'jobcard/create-new-user', component:CreateNewUserComponent},
{path: 'jobcard/create-jobcard', component:CreateJobCardComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
