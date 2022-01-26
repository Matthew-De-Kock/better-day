import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { JobCard } from "../models/job-card.model";
import { PurchaseOrder } from "../models/purchase-order.model";
import { StorageParts  } from "../models/storage-parts.model";
import { Router } from "@angular/router";
// import { ServerURLService } from "./server-url.service";



@Injectable({ providedIn: "root" })
export class JobCardService {
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
  tested_by!: string;
  purchase_Orders!: string[];
  parts_From_Storage!:string[];
  invoices!: string[];
  status!:string;
  constructor(private http: HttpClient, private router: Router) {}

//   Get_Users():Observable<any[]>{
//     return this.http.get<any[]>(this.su.serverURL+"/admin/manage-accounts")
// //return this.http.get<any[]>("http://allelectrical.dyndns.org:3000/admin/manage-accounts")
// }


Get_JobCard_Number():Observable<any[]>{//automated Number
  return  this.http.get<any[]>("http://localhost:3000/jobcard/jobnum")
}


Get_JobCards_InProgress():Observable<any[]>{
  return  this.http.get<any[]>("http://localhost:3000/jobcard/jobcards-in-progress")
}



CreateJobCard(
    job_number:number,
    owner:string,
    start_Date:Date,
    client:string,
    order_no:string,
    company:string,
    description:string,
    panel_Number:string,
     drawings_By:string,
     panel_Builders:string[],
     programmed_By:string,
     tested_By:string,
     status: string){



    const jobcard: JobCard = {
      job_Number: job_number ,
      owner: owner,
      start_Date: start_Date,
      client:client,
      order_Number: order_no,
      company: company,
      description: description,

      panel_Number: panel_Number,
      drawings_By: drawings_By,
      panel_Builders: [],
      programmed_By: programmed_By,
      tested_by: tested_By,
      purchase_Orders: [],
      parts_From_Storage:[],
      invoices: [],
      status:status
     };
      console.log(jobcard)

   this.http.post("http://localhost:3000/jobcard/create-jobcard", jobcard)
     .subscribe((responseData) => {
       console.log(responseData);
     }, error =>{
        console.log(error.error.message)
     });
  }

  Fetch_JobCard(job_Number:number){
    // const job: Email = {
    //   userEmail:userEmail,}


    this.http.post<JobCard>("http://localhost:3000/jobcard/jobcard-in-progress", {job_Number: job_Number})
      .subscribe(responseData => {
       this.job_Number=responseData.job_Number
       this.owner=responseData.owner
       this.start_Date=responseData.start_Date
       this.client=responseData.client
       this.order_Number=responseData.order_Number
       this.company=responseData.company
       this.description=responseData.description
       this.panel_Number=responseData.panel_Number
       this.drawings_By=responseData.drawings_By
       this.panel_Builders=responseData.panel_Builders
       this.programmed_By=responseData.programmed_By
       this.tested_by=responseData.tested_by
       this.purchase_Orders=responseData.purchase_Orders
       this.parts_From_Storage=responseData.parts_From_Storage
       this.invoices=responseData.invoices
       this.status=responseData.status

      }, error =>{

      });
  }
  SaveJobCard(
    job_Number:number,
    owner:string,
    start_Date:Date,
    client:string,
    order_no:string,
    company:string,
    description:string,
    panel_Number:string,
     drawings_By:string,
     panel_Builders:string[],
     programmed_By:string,
     tested_By:string,
     status: string){



    const jobcard: JobCard = {
      job_Number: job_Number ,
      owner: owner,
      start_Date: start_Date,
      client:client,
      order_Number: order_no,
      company: company,
      description: description,

      panel_Number: panel_Number,
      drawings_By: drawings_By,
      panel_Builders: [],
      programmed_By: programmed_By,
      tested_by: tested_By,
      purchase_Orders: [],
      parts_From_Storage:[],
      invoices: [],
      status:status
     };
      console.log(jobcard)

   this.http.post("http://localhost:3000/jobcard/save-jobcard", jobcard)
     .subscribe((responseData) => {
       console.log(responseData);
     }, error =>{
        console.log(error.error.message)
     });
  }
 AddPurchaseOrderToDB(
  job_Number:number,
  supplier:string,
  order_Number:string,){

  const purchaseOrder: PurchaseOrder = {
    job_Number:job_Number,
    supplier:supplier,
    order_Number:order_Number
   };
    console.log(purchaseOrder)

 this.http.post("http://localhost:3000/jobcard/jobcard-in-progress/add-purchase-order", purchaseOrder)
   .subscribe((responseData) => {
     console.log(responseData);
   }, error =>{
      console.log(error.error.message)
   });
 }
 Get_PurchaseOrdersForJobCard(job_Number:number){
   console.log(job_Number)
 return this.http.post<any>("http://localhost:3000/jobcard/jobcards-in-progress/get-purchase-orders", {job_Number: job_Number})

}

onAddManualPart(job_Number:number,part_Name:string,part_Number:string,part_Qty:number,part_Descr:string){
const storageParts: StorageParts={
  job_Number: job_Number ,
  part_Name: part_Name,
  part_Number: part_Number,
  part_Qty: part_Qty,
  part_Descr: part_Descr
}

console.log(storageParts)
this.http.post("http://localhost:3000/jobcard/jobcard-in-progress/add-part", storageParts)
.subscribe(data => {
  console.log(data)
}, error =>{
  console.log(error.error.message)
})
}



  getJobNumber(){
    return this.job_Number;
  }
  getOwner(){
    return this.owner;
  }
  getStartDate(){
    return this.start_Date;
  }
  getClient(){
    return this.client;
  }
  getOrderNumber(){
    return this.order_Number;
  }
  getCompany(){
    return this.company;
  }
  getDescription(){
    return this.description;
  }
  getPanelNumber(){
    return this.panel_Number;
  }
  getDrawingsBy(){
    return this.drawings_By;
  }
  getPanelBuilders(){
    return this.panel_Builders;
  }
  getProgrammedBy(){
    return this.programmed_By;
  }
  getTestedBy(){
    return this.tested_by;
  }
  getPurchaseOrders(){
    return this.purchase_Orders;
  }
  getPartsFromStorage(){
    return this.parts_From_Storage;
  }
  getInvoices(){
    return this.invoices;
  }
  getStatus(){
    return this.status;
  }

}



