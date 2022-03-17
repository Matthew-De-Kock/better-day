import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


interface JobCard {
  job_Number: string;
  owner: number;
  order_Number: number;
  description: string;
}


@Component({
  selector: 'app-view-completed-jobcards',
  templateUrl: './view-completed-jobcards.component.html',
  styleUrls: ['./view-completed-jobcards.component.css']
})
export class ViewCompletedJobcardsComponent implements OnInit {

  STORAGE: Storage[]=[]
  storages:any;
  displayedColumns: string[] = ['job_Number', 'owner', 'order_Number', 'description'];
  ELEMENT_DATA: JobCard[] =[]
  dataSource:any;

  job_Number:any;
  clickedRows = new Set<JobCard>();

  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService,  private router: Router) {
    this.JobCard_Service.Get_Completed_JobCards().subscribe(resp=>{
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


  GetCompletedJobCard(){
    for (let entry of this.clickedRows) {
       this.job_Number=(entry.job_Number);
    }
   this.JobCard_Service.Fetch_JobCard(this.job_Number)
  
   setTimeout(() => {
     this.router.navigate(['jobcard/completed-jobcards/view-jobcard'])
   }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
