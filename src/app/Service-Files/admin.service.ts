import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "./server-Url.service";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class AdminService {

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService) {}

  createUser(name: string, contactNumber: string, email: string, password: string, role:string) {
    const user: User = {
      name: name,
      contactNumber: contactNumber,
      email:email,
      password:password,
      role: role,
     };

     console.log(user)
   this.http.post(this.su.serverURL+"/jobcard/create-new-user", user)
     .subscribe((responseData) => {
       console.log(responseData);
     }, error =>{
        console.log(error.error.message)

     });
  }

}
