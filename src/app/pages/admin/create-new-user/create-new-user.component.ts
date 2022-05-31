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
    var role_arr =[]
    var count= 0
    if(form.value.admin==true){
      role_arr[count]= "Admin";count++
    }
 

   if(form.value.owner==true){
   role_arr[count]= "Owner";count++
   }

   if(form.value.accounts==true){
   role_arr[count]= "Accounts";count++
  }

   if(form.value.panel_builder==true){
   role_arr[count]= "Panel Builder";count++
  }

   if(form.value.drawer==true){
   role_arr[count]= "Drawer";count++
  }

   if(form.value.programmer==true){
   role_arr[count]= "Programmer";count++
  }

   if(form.value.testing==true){
   role_arr[count]= "Testing";count++
  }

   if(form.value.installer==true){
   role_arr[count]= "Installer";count++
  }



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
    this.AS.createUser(form.value.name, form.value.contactNum, form.value.email, form.value.password,role_arr);
//this.name = null;
     form.onReset()
    // form.value.resetForm()
  }

}
