import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from 'src/app/Service-Files/admin.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  pwLengthFault: boolean = false;
  pwMatchFault: boolean = false;
  name = ' ';
  constructor(private router: Router,public AS: AdminService) { }

  ngOnInit() {

  }

  onCreateNewUser(form: NgForm){
    var pw = form.value.password
    var cPw = form.value.confirm_password

    if(pw.length <6 || cPw.length <6){
      this.pwLengthFault = true
      form.value.password=''
      form.value.confirm_password=''
      return;
    }
    else {this.pwLengthFault = false}


    if(pw != cPw){
      this.pwMatchFault = true
      return;
    }
    else {this.pwMatchFault = false}


    if (form.invalid) {

      return;
    }

    var email = form.value.email;
    email=email.toLowerCase()
    //this.router.navigate(['/dashboard']);
//console.log(form.value)
    this.AS.createUser(form.value.name, form.value.contactNum, form.value.email, form.value.password,form.value.role);
//this.name = null;
     form.onReset()
    // form.value.resetForm()
  }

}
