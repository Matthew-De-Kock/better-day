import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import {DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateNewUserComponent } from './pages/admin/create-new-user/create-new-user.component';
import { CreateJobCardComponent } from './pages/job-cards/create-job-card/create-job-card.component';
import { JobCardHomeComponent } from './pages/job-cards/job-card-home/job-card-home.component';
import { EditJobCardComponent } from './pages/job-cards/edit-job-card/edit-job-card.component';
import {ViewJobCardsInProgressComponent} from './pages/job-cards/view-job-cards-in-progress/view-job-cards-in-progress.component';

const routes: Routes = [

  {path: '', redirectTo : '/login',pathMatch: 'full'},

{path: 'login', component:LoginComponent},
{path: 'dashboard', component:DashboardComponent},
{path: 'create-new-user', component:CreateNewUserComponent},

{path: 'jobcard', component:JobCardHomeComponent},
{path: 'jobcard/jobcards-in-progress', component:ViewJobCardsInProgressComponent},
{path: 'jobcard/jobcards-in-progress/edit-jobcard', component:EditJobCardComponent},
{path: 'jobcard/create-jobcard', component:CreateJobCardComponent},

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
