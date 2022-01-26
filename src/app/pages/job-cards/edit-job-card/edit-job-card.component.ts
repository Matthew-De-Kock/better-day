import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { PurchaseOrder } from "src/app/models/purchase-order.model";



interface Country {
  supplier: string;
  orderNum:number;
}

interface Storage {
  name: string;
  qty:number;
}

interface StorageMaterials {
  name: string;
  part_number: number;
  qty: number;
  description: string;
}
const ELEMENT_DATA: StorageMaterials[] = [
  { name: 'Relay', part_number: 10579, qty: 8,description:"Volts 2"},
  { name: 'VSD', part_number: 10879, qty: 5,description:""},
  { name: 'Nuts', part_number: 10979, qty: 150,description:" 5mm"},
  { name: 'Nuts', part_number: 19979, qty: 125,description:"8mm"},

];
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

  model!: NgbDateStruct;

  PURCHASE_ORDERS: PurchaseOrder[]=[]
  purchase_orders:any;

  STORAGE: Storage[]=[]
  storages:any;

 displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];
 dataSource = ELEMENT_DATA;

 selection = new SelectionModel<StorageMaterials>(true,[])

 clickedRows = new Set<StorageMaterials>();

 partsArr:any[]=[]
 qtysArr:any=[]

 jobNumber!:number;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;

  }


  open(content:any) {
    this.modalService.open(content, { size: 'md' });
  }

  openXl(content:any) {
    this.modalService.open(content, { size: 'xl' });
  }


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
    this.model = {year:parseInt(arr[0]),month:parseInt(arr[1]),day:parseInt(arr[2])}

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


    setInterval(()=>{
      this.JobCard_Service.Get_PurchaseOrdersForJobCard(this.job_Number)
      .subscribe((responseData) => {
  var data = responseData
       for (let i = 0; i < data.order_Number_Arr.length; i++) {
        console.log(data.order_Number_Arr[i])

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

    },2000)






    }
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

console.log(      job_number)

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

    this.JobCard_Service.onAddManualPart(this.job_Number,part_Name,part_Number,part_Qty,part_Descr)

  }

  onRowToggled(storageItem:StorageMaterials){
    // this.storages=null
   // this.STORAGE=[]

  this.selection.toggle(storageItem)
  this.partsArr=[]
  console.log(this.selection.selected )

  for (let i = 0; i < this.selection.selected.length; i++) {
    this.partsArr[i] = this.selection.selected[i].name
  }
  console.log( this.partsArr )
  }

}
