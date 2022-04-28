import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { Router } from '@angular/router';
import { PurchaseOrder } from "src/app/models/purchase-order.model";
import { StorageParts } from "src/app/models/storage-parts.model";
import { Invoice } from "src/app/models/invoice.model";
import { DashboardService } from 'src/app/Service-Files/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ServerURLService } from 'src/app/Service-Files/server-Url.service';




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
////////////////////

role = localStorage.getItem("role")!;


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
///////////////////





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


  ownerDisabled:boolean=false;
  startDateDisabled:boolean=false
  clientDisabled:boolean=false
  orderNumberDisabled:boolean=false
  companyDisabled:boolean=false
  descriptionDisabled:boolean=false
  panelNumberDisabled:boolean=false
  drawingsByDisabled:boolean=false
  panelBuildersDisabled:boolean=false
  programmedByDisabled:boolean=false
  testedByDisabled:boolean=false



  pb = new FormControl();
PBs:string[]=["Rueben", "Jaryd", "Jussain"]
flag!:boolean;

  JC_StartDate!: NgbDateStruct;
  IV_StartDate!: NgbDateStruct;


 PURCHASE_ORDERS: PurchaseOrder[]=[]
 JOBCARD_PARTS:StorageParts[]=[]
 INVOICES:Invoice[]=[]

purchase_Orders_complete:boolean = false
invoices_complete:boolean = false
itemsDeliveredChecked:boolean = false
installationChecked:boolean = false

  STORAGE: Storage[]=[]
  storages:any;

 displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];
//  dataSource = ELEMENT_DATA;

//  selection = new SelectionModel<StorageMaterials>(true,[])

//  clickedRows = new Set<StorageMaterials>();

 jobNumber!:number;
  disabled: boolean;
  constructor(private http: HttpClient,config: NgbModalConfig,private ds: DashboardService, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router
    ,private su: ServerURLService) {
    this.role = localStorage.getItem("role")!;
    config.backdrop = 'static';
    config.keyboard = false;
    
    if (this.role!="User") {
      this.disabled=false
    }
    else
    this.disabled=true
    
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
    this.phases = this.JobCard_Service.getPhases();

if (this.owner) {
 this.ownerDisabled=true
}
// if (this.JC_StartDate) {
//   this.startDateDisabled!=true
//  }
 if (this.client) {
  this.clientDisabled=true
 }
 if (this.order_Number) {
  this.orderNumberDisabled=true
 }
 if (this.company) {
  this.companyDisabled=true
 }
 if (this.description) {
  this.descriptionDisabled=true
 }
 if (this.panel_Number) {
  this.panelNumberDisabled=true
 }
 if (this.drawings_By) {
  this.drawingsByDisabled=true
 }

console.log(this.panelBuildersDisabled)
console.log(this.disabled)
 if (this.panel_Builders.length!=0) {
  this.panelBuildersDisabled=true
 }
 if (this.programmed_By) {
  this.programmedByDisabled=true
 }
 if (this.tested_By) {
  this.testedByDisabled=true
 }





   var flag = setInterval(()=>{
    this.checkPhases()

        if (this.flag==false)
        {
          clearInterval(flag)
          }
   },1000)

    this.status=this.JobCard_Service.getStatus()


for (let i = 0; i < this.panel_Builders.length; i++) {
switch (this.panel_Builders[i])
{

  case"Reubin Kirton":
  this.pb1_CHECKED=true
  break

  case"Martin Marx":
  this.pb2_CHECKED=true
  break

  // case"Martin":
  // this.pb3_CHECKED=true
  // break

  // case"Jusain":
  // this.pb4_CHECKED=true
  // break
} //end switch
}//end for loop



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
  checkPhases(){
    // Wokers Assigned Staus
    // workers automatic color
      if(this.panel_Builders.length!=0 &&  this.drawings_By!=undefined && this.programmed_By!=undefined &&  this.tested_By!=undefined){
        this.workers_assigned_phase_BG_color="#5cb85c"
        this.workers_assigned_phase_Text_color='white'
        this.phases[0]="Completed"
        }
     else if(this.panel_Builders.length!=0 || this.drawings_By!=undefined ||this.programmed_By!=undefined || this.tested_By!=undefined){
        this.workers_assigned_phase_BG_color="#0275d8"
        this.workers_assigned_phase_Text_color='white'
        this.phases[0]="In Progress"
        }
      else  if(this.panel_Builders.length==0 &&  this.drawings_By==undefined && this.programmed_By==undefined &&  this.tested_By==undefined){
          this.workers_assigned_phase_BG_color="rgb(242, 242, 242) "
          this.workers_assigned_phase_Text_color='black'
          this.phases[0]="Not Started"
          }
    //
    
      // Drawings Completed 
       if(this.phases[1]=='Acknowledge'){
        this.drawings_phase_BG_color="#f0ad4e"
        this.drawings_assigned_phase_Text_color='white'
      }
      else if(this.phases[1]=='In Progress'){
        this.drawings_phase_BG_color="#0275d8"
        this.drawings_assigned_phase_Text_color='white'
      }
      else if(this.phases[1]=='Completed'){
        this.drawings_phase_BG_color="#5cb85c"
        this.drawings_assigned_phase_Text_color='white'
      }
      else if(this.phases[1]=='Problem'){
        this.drawings_phase_BG_color="#d9534f"
        this.drawings_assigned_phase_Text_color='white'
      }
      else if(this.phases[1]==undefined){
        this.drawings_phase_BG_color="rgb(242, 242, 242) "
        this.drawings_assigned_phase_Text_color='black'
      }
    //
     // Panel Status Completed 
     if(this.phases[2]=='Acknowledge'){
      this.panel_phase_BG_color="#f0ad4e"
      this.panel_phase_Text_color='white'
    }
    else if(this.phases[2]=='In Progress'){
      this.panel_phase_BG_color="#0275d8"
      this.panel_phase_Text_color='white'
    }
    else if(this.phases[2]=='Completed'){
      this.panel_phase_BG_color="#5cb85c"
      this.panel_phase_Text_color='white'
    }
    else if(this.phases[2]=='Problem'){
      this.panel_phase_BG_color="#d9534f"
      this.panel_phase_Text_color='white'
    }
    else if(this.phases[2]==undefined){
      this.panel_phase_BG_color="rgb(242, 242, 242) "
      this.panel_phase_Text_color='black'
    }
    //
      // programmed Completed 
      if(this.phases[3]=='Acknowledge'){
        this.programmed_phase_BG_color="#f0ad4e"
        this.programmed_phase_Text_color='white'
      }
      else if(this.phases[3]=='In Progress'){
        this.programmed_phase_BG_color="#0275d8"
        this.programmed_phase_Text_color='white'
      }
      else if(this.phases[3]=='Completed'){
        this.programmed_phase_BG_color="#5cb85c"
        this.programmed_phase_Text_color='white'
      }
      else if(this.phases[3]=='Problem'){
        this.programmed_phase_BG_color="#d9534f"
        this.programmed_phase_Text_color='white'
      }
      else if(this.phases[3]==undefined){
        this.programmed_phase_BG_color="rgb(242, 242, 242) "
        this.programmed_phase_Text_color='black'
      }
    //
      // Testing Completed 
      if(this.phases[4]=='Acknowledge'){
        this.tested_phase_BG_color="#f0ad4e"
        this.tested_phase_Text_color='white'
      }
      else if(this.phases[4]=='In Progress'){
        this.tested_phase_BG_color="#0275d8"
        this.tested_phase_Text_color='white'
      }
      else if(this.phases[4]=='Completed'){
        this.tested_phase_BG_color="#5cb85c"
        this.tested_phase_Text_color='white'
      }
      else if(this.phases[4]=='Problem'){
        this.tested_phase_BG_color="#d9534f"
        this.tested_phase_Text_color='white'
      }
      else if(this.phases[4]==undefined){
        this.tested_phase_BG_color="rgb(242, 242, 242) "
        this.tested_phase_Text_color='black'
      }
    //
    //purchase Orders Completed
    if(this.phases[5]=='Completed'){
      this.purchase_order_phase_BG_color="#5cb85c"
      this.purchase_order_phase_Text_color='white'
    }
    else if(this.phases[5]=='In Progress'){
      this.purchase_order_phase_BG_color="#0275d8"
      this.purchase_order_phase_Text_color='white'
    }
    else if(this.phases[5]==undefined){
      this.purchase_order_phase_BG_color="rgb(242, 242, 242) "
      this.purchase_order_phase_Text_color='black'
    }
    //
    // Items Delivered
    if(this.PURCHASE_ORDERS.length!=null){
      this.itemsDelivered_phase_BG_color="#0275d8"
      this.itemsDeivered_phase_Text_color='white'
      this.itemsDeliveredChecked = false
    }
    if(this.phases[6]=='Completed'){
      this.itemsDelivered_phase_BG_color="#5cb85c"
      this.itemsDeivered_phase_Text_color='white'
      this.itemsDeliveredChecked = true
    }
    
    else if(this.phases[6]==undefined || this.phases[6]=='' ){
      this.itemsDelivered_phase_BG_color="rgb(242, 242, 242) "
      this.itemsDeivered_phase_Text_color='black'
      this.itemsDeliveredChecked = false
    }
    
    //

        // Installation

        if(this.phases[7]=='Completed'){
          this.installation_phase_BG_color="#5cb85c"
          this.installation_phase_Text_color='white'
          this.installationChecked = true
        }
        
        else if(this.phases[7]==undefined || this.phases[7]=='' ){
          this.installation_phase_BG_color="rgb(242, 242, 242) "
          this.installation_phase_Text_color='black'
          this.installationChecked = false
        }
        
        //
    // Invoicing
    
    if(this.phases[8]=='Completed'){
      this.invoiceing_complete_phase_BG_color='#5cb85c'
      this.invoiceing_complete_phase_Text_color='white'
    }
    else if(this.phases[8]=='In Progress'){
      this.invoiceing_complete_phase_BG_color='#0275d8'
      this.invoiceing_complete_phase_Text_color='white'
    }
    else if(this.phases[8]==undefined){
      this.invoiceing_complete_phase_BG_color='rgb(242, 242, 242)'
      this.invoiceing_complete_phase_Text_color='black'
    }
    //
    
        // Status


if ( this.phases[0]!="Completed"|| this.phases[1]!="Completed"|| this.phases[2]!="Completed"|| this.phases[3]!="Completed"|| this.phases[4]!="Completed"|| this.phases[5]!="Completed"|| this.phases[6]!="Completed"|| this.phases[7]!="Completed"|| this.phases[8]!="Completed"){
  if(this.phases[9]=='In Progress'){
    this.status_phase_BG_color='#0275d8'
    this.status_phase_Text_color='white'
  }
  else{
    this.ds.savePhaseStatus(9,"In Progress",this.job_Number)
    .subscribe((responseData:any) =>{
      this.phases=responseData.phases
    })
  }

}
else if( this.phases[0]=="Completed"&& this.phases[1]=="Completed"&& this.phases[2]=="Completed"&& this.phases[3]=="Completed"&& this.phases[4]=="Completed"&& this.phases[5]=="Completed"&& this.phases[6]=="Completed"&& this.phases[7]=="Completed"&& this.phases[8]=="Completed"){
        if(this.phases[9]=='Completed'){
          this.status_phase_BG_color="#5cb85c"
          this.status_phase_Text_color='white'
        }
        else{
          this.ds.savePhaseStatus(9,"Completed",this.job_Number)
          .subscribe((responseData:any) =>{
            this.phases=responseData.phases
          })

          this.http.post( this.su.serverURL+"/jobcard/save-status", {job_Number:this.job_Number,status:"Completed"})
          .subscribe((responseData) => {
            console.log(responseData);
          }, error =>{
             console.log(error.error.message)
          });
        }
        //
    }
    // else if (this.phases[9] == ''){
    //   this.installation_phase_BG_color="rgb(242, 242, 242) "
    //   this.installation_phase_Text_color='black' 
    // }
// console.log(this.phases[9])
  }
  open(content:any) {
    this.modalService.open(content, { size: 'md' });
  }


  SelectPanelBuilders(form: NgForm){

   var  count=0
   if(form.value.pb1==true){
     this.panel_Builders[count]= "Reubin Kirton"
     this.pb1_CHECKED=true
     count++
   }
   else if(form.value.pb1==undefined||form.value.pb1==false)
   { this.pb1_CHECKED=false}

   if(form.value.pb2==true){
    this.panel_Builders[count]= "Martin Kirton"
     this.pb2_CHECKED=true
     count++
   }
   else if(form.value.pb2==undefined||form.value.pb2==false)
   { this.pb2_CHECKED=false}


  if(form.value.pb3==true){
    this.panel_Builders[count]= "Martin"
     this.pb3_CHECKED=true
     count++
   }
   else if(form.value.pb3==undefined||form.value.pb3==false)
   { this.pb3_CHECKED=false}


  if(form.value.pb4==true){
    this.panel_Builders[count]= "Jusain"
     this.pb4_CHECKED=true
     count++
   }
   else if(form.value.pb4==undefined||form.value.pb4==false)
   { this.pb4_CHECKED=false}

  }
  SaveJobCard(form: NgForm){

    var job_number = this.job_Number
    var owner = form.value.owner
    var start_Date = this.JC_StartDate

 
    var client = form.value.client
    var order_no = form.value.order_no
    var company = form.value.company
    var description = form.value.description
    var panel_Number = form.value.panel_Number
    var drawings_By = form.value.drawings_By

    var panel_Builders = this.panel_Builders
    var programmed_By = form.value.programmed_By
    var tested_By = form.value.tested_By
    var phases = this.phases
    if(this.phases[0]=='Completed' && this.phases[1]=='Completed' && this.phases[2]=='Completed'&& this.phases[3]=='Completed'&& this.phases[4]=='Completed'&& this.phases[5]=='Completed'&& this.phases[6]=='Completed'&& this.phases[7]=='Completed'&& this.phases[8]=='Completed'){
var status = 'Completed'
    }
    else
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
      phases,
      status
    );

    this.router.navigate(['jobcard'])
  }

  onPanelInstalled(event:any){
  if (event.checked==true)
   {
    this.ds.savePhaseStatus(7,"Completed",this.job_Number)
    .subscribe((responseData:any) =>{
      this.phases=responseData.phases
    })
  }
  else 
  this.ds.savePhaseStatus(7,"",this.job_Number)
  .subscribe((responseData:any) =>{
    this.phases=responseData.phases
  })
    }

  onAddPurchaseOrder(form: NgForm){

    var supplier = form.value.supplier;
    var orderNum = form.value.mat_order_no;
     this.JobCard_Service.AddPurchaseOrderToDB(this.job_Number,supplier,orderNum)
     this.ds.savePhaseStatus(5,"In Progress",this.job_Number)
     .subscribe((responseData:any) =>{
       this.phases=responseData.phases

     })

     if (this.phases[6]!="In Progress"){
     this.ds.savePhaseStatus(6,"In Progress",this.job_Number)
     .subscribe((responseData:any) =>{
       this.phases=responseData.phases

     })
    }
  }


  onCompletePurchaseOrders(){
    this.ds.savePhaseStatus(5,"Completed",this.job_Number)
    .subscribe((responseData:any) =>{
      this.phases=responseData.phases
    })
  }

  onItemsDelivered(event:any){
  if (event.checked==true)
   {
    this.ds.savePhaseStatus(6,"Completed",this.job_Number)
    .subscribe((responseData:any) =>{
      this.phases=responseData.phases
    })
  }
  else 
  this.ds.savePhaseStatus(6,"In Progress",this.job_Number)
  .subscribe((responseData:any) =>{
    this.phases=responseData.phases
  })
    }
//materials from storage
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


    this.ds.savePhaseStatus(8,"In Progress",this.job_Number)
    .subscribe((responseData:any) =>{
      this.phases=responseData.phases
    })

  }
 






onCompleteInvoicing(){
  this.ds.savePhaseStatus(8,"Completed",this.job_Number)
  .subscribe((responseData:any) =>{
    this.phases=responseData.phases
  })
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



ngOnDestroy(){
  this.flag=false
}





}
