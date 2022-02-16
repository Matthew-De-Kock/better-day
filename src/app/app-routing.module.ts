import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import {DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CreateNewUserComponent } from './pages/admin/create-new-user/create-new-user.component';
import { CreateJobCardComponent } from './pages/job-cards/create-job-card/create-job-card.component';
import { JobCardHomeComponent } from './pages/job-cards/job-card-home/job-card-home.component';
import { EditJobCardComponent } from './pages/job-cards/edit-job-card/edit-job-card.component';
import {ViewJobCardsInProgressComponent} from './pages/job-cards/view-job-cards-in-progress/view-job-cards-in-progress.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {path: '', redirectTo : '/login',pathMatch: 'full'},

{path: 'login', component:LoginComponent},
{path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},
{path: 'create-new-user', component:CreateNewUserComponent,canActivate:[AuthGuard]},

{path: 'jobcard', component:JobCardHomeComponent,canActivate:[AuthGuard]},
{path: 'jobcard/jobcards-in-progress', component:ViewJobCardsInProgressComponent,canActivate:[AuthGuard]},
{path: 'jobcard/jobcards-in-progress/edit-jobcard', component:EditJobCardComponent,canActivate:[AuthGuard]},
{path: 'jobcard/create-jobcard', component:CreateJobCardComponent,canActivate:[AuthGuard]},

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
