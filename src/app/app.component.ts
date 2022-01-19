import { Component, OnInit,OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './Service-Files/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'better-day';

  constructor(private AS:AuthService){
    this.AS.autoAuthUser();

  }


  ngOnInit(){

  }
}

