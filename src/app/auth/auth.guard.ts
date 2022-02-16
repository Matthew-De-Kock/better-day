import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../Service-Files/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var isAuth = this.authService.getIsAuth();



    if (!isAuth) {
      this.router.navigate(['/login']);
     }

    //  var url = window.location.href
    //  console.log(url)
    //  var urlArr= url.split("4200")// FOR localhost
    //    //var urlArr= url.split("hawkeye")// FOR SERVER
    //  //var urlArr= url.split()// lOCALHOST

    //   url=urlArr[1]

    //  var role = this.authService.getRole();
    //  console.log(role)

     return isAuth
  }
  }
