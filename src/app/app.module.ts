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


  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
