
import { AuthService } from '../Service-Files/auth.service';

import { Component,OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated =false;
  public authListenerSubs!: Subscription;


  role = localStorage.getItem("role")!;
  userName = localStorage.getItem("name")!;
  userEmail = localStorage.getItem("email")!;



  constructor(private authService: AuthService, private router: Router) {
    // this.role = localStorage.getItem("role")!;
    // this.userName = localStorage.getItem("name")!;
    // this.userEmail = localStorage.getItem("email")!;


    setInterval(() => {
      this.role = localStorage.getItem("role")!;
      this.userName = localStorage.getItem("name")!;
      this.userEmail = localStorage.getItem("email")!;
    }, 1000);

//     this.role=this.authService.getRole()
//     setInterval(() => {
//   console.log(this.role)
// }, 1000);
   }






  ngOnInit(){

// setInterval(() => {
//   console.log(this.role)
// }, 1000);
    


    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }


  onLogout() {
     this.authService.logout();
     this.router.navigate(['/login']);
   }

}
