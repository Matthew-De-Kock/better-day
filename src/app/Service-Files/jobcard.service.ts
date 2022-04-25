import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { JobCard } from "../models/job-card.model";
import { PurchaseOrder } from "../models/purchase-order.model";
import { StorageParts  } from "../models/storage-parts.model";
import { Invoice  } from "../models/invoice.model";

import { Router } from "@angular/router";
import { ServerURLService } from "./server-Url.service";
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
  tested_By!: string;
  phases!:string[];
  status!:string;
  constructor(private http: HttpClient, private router: Router,private su: ServerURLService) {
    
  }

//   Get_Users():Observable<any[]>{
//     return this.http.get<any[]>(this.su.serverURL+"/admin/manage-accounts")
// //return this.http.get<any[]>("http://allelectrical.dyndns.org:3000/admin/manage-accounts")
// }


Get_JobCard_Number():Observable<any[]>{//automated Number for create job card
  return  this.http.get<any[]>(this.su.serverURL+"/jobcard/jobnum")
}
Get_JobCards_InProgress():Observable<any[]>{
  return  this.http.get<any[]>(this.su.serverURL+"/jobcard/jobcards-in-progress")
} // for view job cards in progress component
Get_Completed_JobCards():Observable<any[]>{
  return  this.http.get<any[]>(this.su.serverURL+"/jobcard/completed-jobcards")
} // for view completed job cards in progress component


CreateJobCard(
    job_number:number,
    owner:string,
    start_Date:any,
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
      tested_By: tested_By,
      phases:[],
      status:'In Progress'
     };
      console.log(jobcard)

   this.http.post(this.su.serverURL+"/jobcard/create-jobcard", jobcard)
     .subscribe((responseData) => {
       console.log(responseData);
     }, error =>{
        console.log(error.error.message)
     });
  }//automated Number for create job card

  Fetch_JobCard(job_Number:number){

    this.http.post<JobCard>(this.su.serverURL+"/jobcard/fetch-jobcard", {job_Number: job_Number})
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
       this.tested_By=responseData.tested_By
       this.phases=responseData.phases
       this.status=responseData.status

      }, error =>{

      });
  }// for edit jobcard component
  SaveJobCard(

    job_Number:number,
    owner:string,
    start_Date:any,
    client:string,
    order_no:string,
    company:string,
    description:string,
    panel_Number:string,
     drawings_By:string,
     panel_Builders:string[],
     programmed_By:string,
     tested_By:string,
     phases:string[],
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
      panel_Builders: panel_Builders,
      programmed_By: programmed_By,
      tested_By: tested_By,
      phases:phases,
      status:status
     };


   this.http.post(this.su.serverURL+"/jobcard/save-jobcard", jobcard)
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
  
   this.http.post(this.su.serverURL+"/jobcard/jobcard-in-progress/add-purchase-order", purchaseOrder)
     .subscribe((responseData) => {
       console.log(responseData);
     }, error =>{
        console.log(error.error.message)
     });
   }
   Get_PurchaseOrdersForJobCard(job_Number:number){
   return this.http.post<any>(this.su.serverURL+"/jobcard/jobcard-in-progress/get-purchase-orders", {job_Number: job_Number})
  }
  AddManualPart(job_Number:number,part_Name:string,part_Number:string,part_Qty:number,part_Descr:string){
  const storageParts: StorageParts={
    job_Number: job_Number ,
    part_Name: part_Name,
    part_Number: part_Number,
    part_Qty: part_Qty,
    part_Descr: part_Descr
  }
  
  console.log(storageParts)
  this.http.post(this.su.serverURL+"/jobcard/jobcard-in-progress/add-part", storageParts)
  .subscribe(data => {
    console.log(data)
  }, error =>{
    console.log(error.error.message)
  })
      }
  Get_JobCardParts(job_Number:number){
      return this.http.post<any>(this.su.serverURL+"/jobcard/jobcard-in-progress/get-jobcard-parts", {job_Number: job_Number})
     }
  
  AddInvoice(job_Number:number,invoice_Number:string,client_Name:string,date:Date){
    let timestamp = new Date()
      const invoice: Invoice={
        job_Number: job_Number ,
        invoice_Number: invoice_Number,
        client_Name: client_Name,
        date: date,
        timestamp: timestamp
      }
      console.log(invoice)
      this.http.post(this.su.serverURL+"/jobcard/jobcard-in-progress/add-invoice", invoice)
      .subscribe(data => {
        console.log(data)
      }, error =>{
        console.log(error.error.message)
      })
          }
  Get_Invoices(job_Number:number){
      return this.http.post<any>(this.su.serverURL+"/jobcard/jobcard-in-progress/get-invoices", {job_Number: job_Number})
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
    return this.tested_By;
  }

  getPhases(){
    return this.phases;
  }
  getStatus(){
    return this.status;
  }

}



