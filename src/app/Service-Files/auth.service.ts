import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "./server-Url.service";

// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class AuthService {
  private name!: string;
  private contactNumber! : string
  private email!: string;
  private roles! : string[]
  private token:string ="";

  private tokenTimer : any;
  private isAuthenticated= false;
  private authStatusListener = new Subject<boolean>();
  errorMessage!: string;
  error:boolean = false;

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService) {

  }




  getName(){
    return this.name;
  }
  getContactNumber(){
    return this.contactNumber;
  }

  getEmail(){
    return this.email;
  }

  getRole(){
    return this.roles;
  }

  getIsAuth(){
    return this.isAuthenticated;
   }

   getToken(){
     return this.token;

   }

   getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }



  login( email: string, password:string){
    const user: User = {name:"",contactNumber:"", email:email, password:password, roles:[]  };
    //http://localhost:3000
   this.http.post<{token:string, expiresIn: number,name:string, roles:string[] ,contactNumber:string, email:string, password:string}>(this.su.serverURL+"/login",user)
   //this.http.post<{token:string, expiresIn: number,name:string, roles:string ,contactNumber:string, email:string, password:string}>("http://localhost:3000/login",user)
    .subscribe(response=>{
   const token = response.token;
   this.token =token;
  // console.log(response)

  if (token){
      const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated=true;

        this.name=response.name;
        this.contactNumber=response.contactNumber;
        console.log()
        this.roles=response.roles;

        this.email=response.email;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date (now.getTime() + expiresInDuration*1000);
        console.log(this.email)
console.log(this.roles)
          this.saveAuthData(token,expirationDate,this.name, this.contactNumber,this.email,this.roles)
          this.router.navigate(['/dashboard']);
  }
    }, error=>{
      // console.log(error.error.message);
      this.authStatusListener.next(false);
      this.errorMessage = error.error.message;
      this.error= true;
      // this.errorMessage=error.message;
      // this.router.navigate(['/login']);
    }
    )
  }


  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
   const now = new Date();
   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
   if(expiresIn>0){
   this.token = authInformation.token;
   this.isAuthenticated=true;
   this.name = authInformation.name;
   this.contactNumber = authInformation.contactNumber;
   this.email = authInformation.email;
   this.roles = authInformation.roles;

   this.setAuthTimer(expiresIn/1000);
   this.authStatusListener.next(true);

   }

   }


   logout(){
   this.token = "";
   this.isAuthenticated = false;
   this.authStatusListener.next(false);
   clearTimeout(this.tokenTimer);
   this.clearAuthData();
   this.name='';
   this.contactNumber='';
   this.email=''
   this.roles=[];
   this.router.navigate(['/login']);
   }


   private setAuthTimer(duration: number){
     this.tokenTimer = setTimeout(()=>{

      this.logout();
     // this.onLogout();
     },duration * 1000) ;
   }

   private saveAuthData(token:string, expirationDate: Date, name: string, contactNumber:string, email:string, roles:string[]){
     localStorage.setItem("token", token);
     localStorage.setItem("expiration", expirationDate.toISOString());

     localStorage.setItem("name", name);
     localStorage.setItem("contactNumber", contactNumber);
     localStorage.setItem("email", email);
     localStorage.setItem("roles", JSON.stringify(roles));
   }

   private clearAuthData(){
     localStorage.removeItem("token");
     localStorage.removeItem("expiration");
     localStorage.removeItem("name");
     localStorage.removeItem("contactNumber");
     localStorage.removeItem("email");
     localStorage.removeItem("roles")
   }

   private getAuthData(){
     const token = localStorage.getItem("token");
     const expirationDate = localStorage.getItem("expiration");
     const name = localStorage.getItem("name")!;
     const contactNumber = localStorage.getItem("contactNumber")!;
     const email = (localStorage.getItem("email")!);
     const roles = JSON.parse(localStorage.getItem("roles")!);

     if(!token || !expirationDate ){
   return;
     }
     return{
       token: token,
       expirationDate: new Date(expirationDate),
       name: name,
       contactNumber: contactNumber,
       email: email,
       roles: roles,
     }

   }


}
