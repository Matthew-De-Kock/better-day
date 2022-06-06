import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServerURLService } from 'src/app/Service-Files/server-Url.service';





@Component({
  selector: 'app-create-job-card',
  templateUrl: './create-job-card.component.html',
  styleUrls: ['./create-job-card.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CreateJobCardComponent implements OnInit {
;

   owner="owner"
   model!: NgbDateStruct;
   jobNumber!:number;

   start_date_Invalid:boolean=false

   owners!:string[]

  constructor(private http: HttpClient,config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService,  private router: Router,private su: ServerURLService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.JobCard_Service.Get_JobCard_Number().subscribe(resp=>{
      var data:any
      data = resp
      if(!data.recentJobNum){
this.jobNumber=1745
      }
      else
       this.jobNumber=data.recentJobNum +1
    })

    this.getOwners()
  }

  ngOnInit(){

}


CreateJobCard(form: NgForm){


  var job_number = this.jobNumber
  var owner = form.value.owner
  var start_Date = form.value.start_Date
  var client = form.value.client
  var order_no = form.value.order_no
  var company = form.value.company
  var description = form.value.description

  var panel_Number = form.value.panel_Number
  var drawings_By = form.value.drawings_By
  var panel_Builders = form.value.panel_Builders
  var programmed_By = form.value.programmed_By
  var tested_By = form.value.tested_By
  var status = "In Progress"


if(!start_Date){
this.start_date_Invalid=true;
return
}

  this.JobCard_Service.CreateJobCard(
    job_number,
    owner,
    start_Date,
    client,
    order_no,
    company,
    description,
    panel_Number,
    drawings_By,
    panel_Builders,
    programmed_By,
    tested_By,
    status
  );

  this.router.navigate(['jobcard']);

}

getOwners(){
  this.http.get<any>(this.su.serverURL+"/get-owners").subscribe(data=>{
    this.owners=data.record
  })


}


openSnackBar() {

  if ( this.start_date_Invalid==true) {
    this.start_date_Invalid=false
  }
  else if  ( this.start_date_Invalid==false) {
    this.start_date_Invalid=true
  }
  };

}


