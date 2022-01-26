import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


interface JobCardInProgress {
  job_Number: string;
  owner: number;
  order_Number: number;
  description: string;
}
// const ELEMENT_DATA: JobCardInProgress[] = [
//   { name: 'Relay', part_number: 10579, qty: 8,description:"Volts 2"},
//   { name: 'VSD', part_number: 10879, qty: 5,description:""},
//   { name: 'Nuts', part_number: 10979, qty: 150,description:" 5mm"},
//   { name: 'Nuts', part_number: 19979, qty: 125,description:"8mm"},

// ];
@Component({
  selector: 'app-view-job-cards-in-progress',
  templateUrl: './view-job-cards-in-progress.component.html',
  styleUrls: ['./view-job-cards-in-progress.component.css']
})
export class ViewJobCardsInProgressComponent implements OnInit {

  STORAGE: Storage[]=[]
  storages:any;
  displayedColumns: string[] = ['job_Number', 'owner', 'order_Number', 'description'];
  ELEMENT_DATA: JobCardInProgress[] =[]
  dataSource:any;

  job_Number:any;

  clickedRows = new Set<JobCardInProgress>();

  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService,  private router: Router) {
    this.JobCard_Service.Get_JobCards_InProgress().subscribe(resp=>{
      var data:any
      data = resp
      for (let i = 0; i < data.jobcards_InProgress.length; i++) {
        this.ELEMENT_DATA[i] =  { job_Number:  data.jobcards_InProgress[i].job_Number, owner: data.jobcards_InProgress[i].owner, order_Number: data.jobcards_InProgress[i].order_Number,description:data.jobcards_InProgress[i].description}
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    })
  }



  ngOnInit() {
  }


get_edit_user(){
  for (let entry of this.clickedRows) {
     this.job_Number=(entry.job_Number);
  }


// this.as.uEmail= this.email
 this.JobCard_Service.Fetch_JobCard(this.job_Number)

 setTimeout(() => {
   this.router.navigate(['jobcard/jobcards-in-progress/edit-jobcard'])
 }, 500);
}
}
