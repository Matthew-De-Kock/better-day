
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


  roles:string[]=[]
  userName = localStorage.getItem("name")!;
  userEmail = localStorage.getItem("email")!;



  constructor(private authService: AuthService, private router: Router) {


    setInterval(() => {
      this.roles = JSON.parse(localStorage.getItem("roles")!);
      this.userName = localStorage.getItem("name")!;
      this.userEmail = localStorage.getItem("email")!;
     
    }, 1000);

    this.roles=this.authService.getRole()
    setInterval(() => {

}, 1000);
   }






  ngOnInit(){


    


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
