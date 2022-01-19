
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

  constructor(private authService: AuthService, private router: Router) { }
  userIsAuthenticated =false;
  public authListenerSubs!: Subscription;

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
