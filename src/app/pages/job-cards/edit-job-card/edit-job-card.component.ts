import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';
import { CanDeactivate, Router } from '@angular/router';
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


roles = JSON.parse(localStorage.getItem("roles")!);

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

  owners!:string[]
  drawers!:string[]
  programmers!:string[]
  testers!:string[]
  panelBuilders!:string[]
  installers!:string[]

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

  Panel_Builders_FC = new FormControl();

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
  invoicesRole:boolean=false

  accountsRoleDisabled:boolean=false



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
installationNAChecked:boolean = false
installationDisabled:boolean=false


  STORAGE: Storage[]=[]
  storages:any;

 displayedColumns: string[] = ['select','name', 'part_number', 'qty', 'description'];

 jobNumber!:number;
 disabled: boolean=true;

 invNum!:any
 invClient!:string
 invDate!:any

 partName:any
 partNumber:any
 partQty:any
 partDesc:any

 poSupplier:any
 poOrderNum:any



  constructor(private http: HttpClient,config: NgbModalConfig,private ds: DashboardService, private modalService: NgbModal, private JobCard_Service:JobCardService, private router: Router
    ,private su: ServerURLService) {
    this.roles = JSON.parse(localStorage.getItem("roles")!);
    config.backdrop = 'static';
    config.keyboard = false;
    

    for (let i = 0; i < this.roles.length; i++) {
    if (this.roles[i]=="Admin"||this.roles[i]=="Owner"||this.roles[i]=="Accounts") {
      this.disabled=false
    }
    }

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

    this.getComboboxData()



    if(this.phases[7]=='Completed'){
      this.installationChecked = true

      for (let i = 0; i < this.roles.length; i++) {
        console.log(this.roles[i])
      if (this.roles[i]=="Admin") {

        this.installationDisabled=false
i=100
      }
      else
      this.installationDisabled=true
      }
    console.log( this.installationDisabled)  
    }

    else if(this.phases[7]==undefined || this.phases[7]=='' ){
     this.installationChecked = false
    }
    
    this.Panel_Builders_FC.setValue(this.panel_Builders)


    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i]=="Accounts") {
        this.accountsRoleDisabled=false
      }
      }


if (this.owner) {
  this.ownerDisabled= this.roles.includes("Admin")
  if(this.ownerDisabled==true){
    this.ownerDisabled=false
  }
  else if(this.ownerDisabled==false)
 this.ownerDisabled=true
}

// if (this.JC_StartDate) {
//   if(this.role=="Admin"){
//     this.startDateDisabled=false
//   }
//   else
//   this.startDateDisabled!=true
//  }


 if (this.client) {
  this.clientDisabled= this.roles.includes("Admin")
  if(this.clientDisabled==true){
    this.clientDisabled=false
  }
  else if(this.clientDisabled==false)
 this.clientDisabled=true
 }

 if (this.order_Number) {
  this.orderNumberDisabled= this.roles.includes("Admin")
  if(this.orderNumberDisabled==true){
    this.orderNumberDisabled=false
  }
  else if(this.orderNumberDisabled==false)
 this.orderNumberDisabled=true
 }

 if (this.company) {
  this.companyDisabled= this.roles.includes("Admin")
  if(this.companyDisabled==true){
    this.companyDisabled=false
  }
  else if(this.companyDisabled==false)
 this.companyDisabled=true
 }

 if (this.description) {
  this.descriptionDisabled= this.roles.includes("Admin")
  if(this.descriptionDisabled==true){
    this.descriptionDisabled=false
  }
  else if(this.descriptionDisabled==false)
 this.descriptionDisabled=true
 }

 if (this.panel_Number) {
  this.panelNumberDisabled= this.roles.includes("Admin")
  if(this.panelNumberDisabled==true){
    this.panelNumberDisabled=false
  }
  else if(this.panelNumberDisabled==false)
 this.panelNumberDisabled=true
 }

 if (this.drawings_By) {
  this.drawingsByDisabled= this.roles.includes("Admin")
  if(this.drawingsByDisabled==true){
    this.drawingsByDisabled=false
  }
  else if(this.drawingsByDisabled==false)
 this.drawingsByDisabled=true
 }



 if (this.panel_Builders) {
for (let i = 0; i < this.roles.length; i++) {
  (this.roles[i])
if (this.roles[i]=="Admin"||this.roles[i]=="Owner") {
  ("IN iF")
  this.panelBuildersDisabled=false
  i=100
}
else
this.panelBuildersDisabled=true
}
 }

 (this.panelBuildersDisabled)

 if (this.programmed_By) {
  this.programmedByDisabled= this.roles.includes("Admin")
  if(this.programmedByDisabled==true){
    this.programmedByDisabled=false
  }
  else if(this.programmedByDisabled==false)
 this.programmedByDisabled=true
 }

 if (this.tested_By) {
  this.testedByDisabled= this.roles.includes("Admin")
  if(this.testedByDisabled==true){
    this.testedByDisabled=false
  }
  else if(this.testedByDisabled==false)
 this.testedByDisabled=true
 }

 if (this.tested_By) {
  this.testedByDisabled= this.roles.includes("Admin")
  if(this.testedByDisabled==true){
    this.testedByDisabled=false
  }
  else if(this.testedByDisabled==false)
 this.testedByDisabled=true
 }


for (let i = 0; i < this.roles.length; i++) {
  if(this.roles[i]=="Admin"||this.roles[i]=="Accounts"){
this.invoicesRole=true
  }
}


setInterval(()=>{
  // console.log(this.Panel_Builders_FC.value)
},1000)


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
          // this.installationChecked = true
        }
        else if(this.phases[7]==undefined || this.phases[7]=='' ){
          this.installation_phase_BG_color="rgb(242, 242, 242) "
          this.installation_phase_Text_color='black'
          // this.installationChecked = false
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

    var panel_Builders = this.Panel_Builders_FC.value
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
// console.log(form.value.installationChecked)
    if (form.value.installationChecked==true)
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

    this.router.navigate(['jobcard'])
  }

  // onPanelInstalled(event:any){
  // if (event.checked==true)
  //  {
  //   this.ds.savePhaseStatus(7,"Completed",this.job_Number)
  //   .subscribe((responseData:any) =>{
  //     this.phases=responseData.phases
  //   })
  // }
  // else 
  // this.ds.savePhaseStatus(7,"",this.job_Number)
  // .subscribe((responseData:any) =>{
  //   this.phases=responseData.phases
  // })
  //   }

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

    this.poSupplier=""
    this.poOrderNum=""
   
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
    this.partName=""
    this.partNumber=""
    this.partQty=""
    this.partDesc=""
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


    this.poSupplier=""
    this.poOrderNum=""
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


deleteRow(itemNumber:any,type:string){

  let info ={
    itemNumber:itemNumber,
    type:type
  }
  this.http.post<any>(this.su.serverURL+"/jobcard/delete-row",info).subscribe(responseData=>{
var data = responseData

  if (data.type=="Invoice"){
    this.INVOICES=[]

    for (let i = 0; i < data.record.length; i++) {

      this.INVOICES[i]= {
        job_Number:0,
        invoice_Number: data.record.invoice_Number[i],
        client_Name: data.record.client_Name[i],
        date: data.record.date[0],
        timestamp:data.record.timestamp[i]
        }
    }
  }
  else   if (data.type=="Purchase Order"){
  
    this.PURCHASE_ORDERS=[]
    for (let i = 0; i < data.record.length; i++) {
      this.PURCHASE_ORDERS[i]=
        {
        job_Number:0,
        supplier: data.record.supplier[i],
        order_Number: data.record.order_Number[i],
        }
    }
  
  }
  else if (data.type=="Storage"){
    this.JOBCARD_PARTS=[]


    for (let i = 0; i < data.record.length; i++) {
      this.JOBCARD_PARTS[i]=
        {
        job_Number:0,
        part_Name: data.record.part_Name[i],
        part_Number: data.record.part_Number[i],
        part_Qty: data.record.part_Qty[i],
        part_Descr: data.record.part_Descr[i],
        }
    }
  }




  })

  console.log(itemNumber)
}

getComboboxData(){


  this.http.get<any>(this.su.serverURL+"/get-owners").subscribe(data=>{
    this.owners=data.record
  })

  this.http.get<any>(this.su.serverURL+"/get-drawers").subscribe(data=>{
    this.drawers=data.record
   // console.log(this.drawers)
  })

  this.http.get<any>(this.su.serverURL+"/get-programmers").subscribe(data=>{
    this.programmers=data.record
  //  console.log(this.programmers)
  })

  this.http.get<any>(this.su.serverURL+"/get-testers").subscribe(data=>{
    this.testers=data.record
   // console.log(this.testers)
  })

  this.http.get<any>(this.su.serverURL+"/get-panelbuilders").subscribe(data=>{
    this.panelBuilders=data.record
   // console.log(this.panelBuilders)
  })

  this.http.get<any>(this.su.serverURL+"/get-installers").subscribe(data=>{
    this.installers=data.record
    //console.log(this.installers)
  })

}

ngOnDestroy(){
  this.flag=false
}









}
