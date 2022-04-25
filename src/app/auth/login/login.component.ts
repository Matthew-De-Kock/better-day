import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Service-Files/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor( private router: Router, public authService:AuthService) { }

  ngOnInit(){

//     setInterval(() => {
// console.log(this.AS.getToken())
//     },2000)
  }


  onLogin(form: NgForm){
    if (form.invalid) {

      return;
    }

    var email = form.value.email;
    email=email.toLowerCase()
this.authService.login(email,form.value.password)
  }


  openSnackBar() {
    this.authService.error=false;
    };

}
