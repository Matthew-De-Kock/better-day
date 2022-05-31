import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
@Component({
  selector: 'app-job-card-home',
  templateUrl: './job-card-home.component.html',
  styleUrls: ['./job-card-home.component.css']
})
export class JobCardHomeComponent implements OnInit {

disabled:boolean=true

 // roles = localStorage.getItem("role")!;
 roles = JSON.parse(localStorage.getItem("roles")!);
  userName = localStorage.getItem("name")!;
  userEmail = localStorage.getItem("email")!;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router) { }

  ngOnInit() {
    for (let i = 0; i < this.roles.length; i++) {
if (this.roles[i]=="Admin"||this.roles[i]=="Owner"){
this.disabled=false;
}
}




  // if (this.roles[i]=="Admin" ) {
  //   this.disabled=false
  // }
  // else
  // this.disabled=true
  
  



  }


  open(content:any) {
    this.modalService.open(content, { size: 'sm', centered: true });
  }

  createNewJobCard_Number(){
this.router.navigate(['jobcard/create-jobcard']);
  }
}
