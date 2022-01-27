import { Component, OnInit } from '@angular/core';
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



interface Country {
  supplier: string;
  orderNum:number;
}

interface Storage {
  name: string;
  qty:number;
}


// const ELEMENT_DATA: StorageMaterials[] = [
//   { name: 'Relay', part_number: 10579, qty: 8,description:"Volts 2"},
//   { name: 'VSD', part_number: 10879, qty: 5,description:""},
//   { name: 'Nuts', part_number: 10979, qty: 150,description:" 5mm"},
//   { name: 'Nuts', part_number: 19979, qty: 125,description:"8mm"},

// ];
@Component({
  selector: 'app-edit-job-card',
  templateUrl: './edit-job-card.component.html',
  styleUrls: ['./edit-job-card.component.css']
})
export class EditJobCardComponent implements OnInit {

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
  status!:string;

flag!:boolean;

  JC_StartDate!: NgbDateStruct;
  IV_StartDate!: NgbDateStruct;


 PURCHASE_ORDERS: PurchaseOrder[]=[]
 JOBCARD_PARTS:StorageParts[]=[]
 INVOICES:Invoice[]=[]


  STORAGE: Storage[]=[]
  storages:any;

 displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];
//  dataSource = ELEMENT_DATA;

//  selection = new SelectionModel<StorageMaterials>(true,[])

//  clickedRows = new Set<StorageMaterials>();

 partsArr:any[]=[]
 qtysArr:any=[]

 jobNumber!:number;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;

  }


  // openXl(content:any) {
  //   this.modalService.open(content, { size: 'xl' });
  // }


  ngOnInit(){
    this.job_Number = this.JobCard_Service.getJobNumber()
    if(!this.job_Number){
      this.router.navigate(['/jobcard/jobcards-in-progress'])
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
    this.purchase_Orders=this.JobCard_Service.getPurchaseOrders()
    this.parts_From_Storage=this.JobCard_Service.getPartsFromStorage()
    this.invoices=this.JobCard_Service.getInvoices()
    this.status=this.JobCard_Service.getStatus()

    this.flag=true
    this.callPurchaseOrderTable()
    this.callJobCardPartsFromStorage()
    this.callInvoices()
  setInterval(()=>{
   if (this.flag==true) {
    this.callPurchaseOrderTable()
    this.callJobCardPartsFromStorage()
    this.callInvoices()
   }

  },2000)








    }
  }
  open(content:any) {
    this.modalService.open(content, { size: 'md' });
  }


  SaveJobCard(form: NgForm){
    var job_number = form.value.job_number
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

    this.JobCard_Service.SaveJobCard(
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
  }



  onAddPurchaseOrder(form: NgForm){

    var supplier = form.value.supplier;
    var orderNum = form.value.mat_order_no;
     this.JobCard_Service.AddPurchaseOrderToDB(this.job_Number,supplier,orderNum)
  }



  onAddManualPart(form: NgForm){

    var part_Name = form.value.manual_part_name_add;
    var part_Number = form.value.manual_part_num_add;
    var part_Qty = form.value.manual_part_qty_add;
    var part_Descr = form.value.manual_part_descr_add;

    this.JobCard_Service.AddManualPart(this.job_Number,part_Name,part_Number,part_Qty,part_Descr)

  }


  onAddInvoice(form: NgForm){

    var invoice_Number = form.value.invoice_Number;
    var client_Name = form.value.invoice_Client;
    var date = form.value.date;

    this.JobCard_Service.AddInvoice(this.job_Number,invoice_Number,client_Name,date)

  }




  callPurchaseOrderTable(){
    this.JobCard_Service.Get_PurchaseOrdersForJobCard(this.job_Number)
    .subscribe((responseData) => {
      var data = responseData
     for (let i = 0; i < data.order_Number_Arr.length; i++) {

      this.PURCHASE_ORDERS[i]=
        {
        job_Number:0,
        supplier: data.supplier_Arr[i],
        order_Number: data.order_Number_Arr[i],
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

  ngOnDestroy(){
    this.flag=false
}


 // onRowToggled(storageItem:StorageMaterials){
  //   // this.storages=null
  //  // this.STORAGE=[]

  // this.selection.toggle(storageItem)
  // this.partsArr=[]
  // console.log(this.selection.selected )

  // for (let i = 0; i < this.selection.selected.length; i++) {
  //   this.partsArr[i] = this.selection.selected[i].name
  // }
  // console.log( this.partsArr )
  // }
}
