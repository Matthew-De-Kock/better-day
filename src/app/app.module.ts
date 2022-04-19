import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateJobCardComponent } from './pages/job-cards/create-job-card/create-job-card.component';
import { CreateNewUserComponent } from './pages/admin/create-new-user/create-new-user.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JobCardHomeComponent } from './pages/job-cards/job-card-home/job-card-home.component';
import { EditJobCardComponent } from './pages/job-cards/edit-job-card/edit-job-card.component';
import { ViewJobCardsInProgressComponent } from './pages/job-cards/view-job-cards-in-progress/view-job-cards-in-progress.component';
import { ViewCompletedJobcardsComponent } from './pages/job-cards/view-completed-jobcards/view-completed-jobcards.component';
import { ViewJobcardComponent } from './pages/job-cards/view-jobcard/view-jobcard.component';
import { YourTasksComponent } from './pages/tasks/your-tasks/your-tasks.component';
import { SearchfilterPipe } from './searchfilter.pipe';



@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    HttpClientModule,


  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    CreateJobCardComponent,
    CreateNewUserComponent,
    JobCardHomeComponent,
    EditJobCardComponent,
    ViewJobCardsInProgressComponent,
    ViewCompletedJobcardsComponent,
    ViewJobcardComponent,
    YourTasksComponent,
    SearchfilterPipe,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
