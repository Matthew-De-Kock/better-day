import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';





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
  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService,  private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.JobCard_Service.Get_JobCard_Number().subscribe(resp=>{
      var data:any
      data = resp
      this.jobNumber=data.recentJobNum +1
    })
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



}


