import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor( private router: Router) { }

  ngOnInit(){
  }


  onLogin(form: NgForm){
    if (form.invalid) {

      return;
    }

    var email = form.value.email;
    email=email.toLowerCase()
    console.log(email)
    console.log(form.value.password)
    this.router.navigate(['/dashboard']);
  }

}
