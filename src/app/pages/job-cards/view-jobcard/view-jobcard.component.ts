import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { PurchaseOrder } from "src/app/models/purchase-order.model";
import { StorageParts } from "src/app/models/storage-parts.model";
import { Invoice } from "src/app/models/invoice.model";
import { DashboardService } from 'src/app/Service-Files/dashboard.service';
import { HttpClient } from '@angular/common/http';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

interface Country {
  supplier: string;
  orderNum:number;
}

interface Storage {
  name: string;
  qty:number;
}

@Component({
  selector: 'app-view-jobcard',
  templateUrl: './view-jobcard.component.html',
  styleUrls: ['./view-jobcard.component.css']
})



export class ViewJobcardComponent implements OnInit {


  workers_assigned_phase_BG_color:any;
  workers_assigned_phase_Text_color:any;

  drawings_phase_BG_color:any;
  drawings_assigned_phase_Text_color:any;

  
  programmed_phase_BG_color:any;
  programmed_phase_Text_color:any;

  
  panel_phase_BG_color:any;
  panel_phase_Text_color:any;

  
  tested_phase_BG_color:any;
  tested_phase_Text_color:any;

  purchase_order_phase_BG_color:any;
  purchase_order_phase_Text_color:any;

  installation_phase_BG_color:any;
  installation_phase_Text_color:any;

  itemsDelivered_phase_BG_color:any;
  itemsDeivered_phase_Text_color:any;

  invoiceing_complete_phase_BG_color:any;
  invoiceing_complete_phase_Text_color:any;

  status_phase_BG_color:any;
  status_phase_Text_color:any;

  color = 'primary'
  pb1_CHECKED:boolean = false;
  pb2_CHECKED:boolean = false
  pb3_CHECKED:boolean = false
  pb4_CHECKED:boolean = false

  job_Number!: number ;
  owner!: string;
  start_Date!: Date;
  client!:string;
  order_Number!: string;
  company!: string;
  description!: string;
  panel_Number!: string;
  drawings_By!:string;
  panel_Builders!: string[];
  programmed_By!: string;
  tested_By!: string;
  purchase_Orders!: string[];
  parts_From_Storage!:string[];
  invoices!: string[];
  phases!: string[]
  status!:string;

  pb = new FormControl();
PBs:string[]=["Rueben", "Jaryd", "Jussain"]
flag!:boolean;

  JC_StartDate!: NgbDateStruct;
  IV_StartDate!: NgbDateStruct;


 PURCHASE_ORDERS: PurchaseOrder[]=[]
 JOBCARD_PARTS:StorageParts[]=[]
 INVOICES:Invoice[]=[]


itemsDeliveredChecked:boolean = true
installationChecked:boolean = true

  STORAGE: Storage[]=[]
  storages:any;

 displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];

 jobNumber!:number;



 constructor(private http: HttpClient,config: NgbModalConfig,private ds: DashboardService, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router) {
  config.backdrop = 'static';
  config.keyboard = false;

}

ngOnInit(){
  this.job_Number = this.JobCard_Service.getJobNumber()
  if(!this.job_Number){
    this.router.navigate(['/jobcard/completed-jobcards'])
  }
  else{

  this.owner=this.JobCard_Service.getOwner()
  var start_Date=this.JobCard_Service.getStartDate()

  var date = start_Date.toString().split("T")
  var arr = date[0].split("-")
  this.JC_StartDate = {year:parseInt(arr[0]),month:parseInt(arr[1]),day:parseInt(arr[2])}
  this.client=this.JobCard_Service.getClient()
  this.order_Number=this.JobCard_Service.getOrderNumber()
  this.company=this.JobCard_Service.getCompany()
  this.description=this.JobCard_Service.getDescription()
  this.panel_Number=this.JobCard_Service.getPanelNumber()
  this.drawings_By=this.JobCard_Service.getDrawingsBy()
  this.panel_Builders=this.JobCard_Service.getPanelBuilders()
  this.programmed_By=this.JobCard_Service.getProgrammedBy()
  this.tested_By=this.JobCard_Service.getTestedBy()
  this.phases = this.JobCard_Service.getPhases();



  this.status=this.JobCard_Service.getStatus()


for (let i = 0; i < this.panel_Builders.length; i++) {
switch (this.panel_Builders[i])
{

case"Rueben":
this.pb1_CHECKED=true
break

case"Jaryd":
this.pb2_CHECKED=true
break

case"Martin":
this.pb3_CHECKED=true
break

case"Jusain":
this.pb4_CHECKED=true
break
} //end switch
}//end for loop



  this.flag=true
  this.callPurchaseOrderTable()
  this.callJobCardPartsFromStorage()
  this.callInvoices()

  }
}



@ViewChild('jobcard') jobcard!:ElementRef;
public downloadPDF()
{
  let jobcard = this.jobcard.nativeElement
html2canvas(jobcard).then(canvas => {
// Few necessary setting options
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'cm', 'a4'); // A4 size page of PDF
var width = pdf.internal.pageSize.getWidth();
var height = canvas.height * width / canvas.width;
pdf.addImage(contentDataURL, 'JPEG', 0, 0, width, height)
pdf.save('a4.pdf'); // Generated PDF
});
}

callPurchaseOrderTable(){
  this.JobCard_Service.Get_PurchaseOrdersForJobCard(this.job_Number)
  .subscribe((responseData) => {

    if (responseData.order_Number_Arr.length!=0)
{


    var data = responseData
   for (let i = 0; i < data.order_Number_Arr.length; i++) {

    this.PURCHASE_ORDERS[i]=
      {
      job_Number:0,
      supplier: data.supplier_Arr[i],
      order_Number: data.order_Number_Arr[i],
      }
  }
}
  }, error =>{
     console.log(error.error.message)
  });

}

callJobCardPartsFromStorage(){
  this.JobCard_Service.Get_JobCardParts(this.job_Number)
  .subscribe((responseData) => {
    var data = responseData

   for (let i = 0; i < data.job_Number_Arr.length; i++) {

    this.JOBCARD_PARTS[i]=
      {
      job_Number:0,
      part_Name: data.part_Name_Arr[i],
      part_Number: data.part_Number_Arr[i],
      part_Qty: data.part_Qty_Arr[i],
      part_Descr: data.part_Descr_Arr[i],
      }
  }
  }, error =>{
     console.log(error.error.message)
  });
}

callInvoices(){
  this.JobCard_Service.Get_Invoices(this.job_Number)
  .subscribe((responseData) => {
    var data = responseData

   for (let i = 0; i < data.job_Number_Arr.length; i++) {
    var date = data.date_Arr[i].toString().split("T")
    this.INVOICES[i]= {
      job_Number:0,
      invoice_Number: data.invoice_Number_Arr[i],
      client_Name: data.client_Name_Arr[i],
      date: date[0],
      timestamp:data.date_Arr[i]
      }
  }
  }, error =>{
     console.log(error.error.message)
  });
}

open(content:any) {
  this.modalService.open(content, { size: 'md' });
}
}
