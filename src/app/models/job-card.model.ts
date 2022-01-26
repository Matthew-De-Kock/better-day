import { ArrayType } from "@angular/compiler";

export interface JobCard {
  job_Number: number ;
  owner: string;
  start_Date: Date;
  client:string;
  order_Number: string;
  company: string;
  description: string;
  panel_Number: string;
  drawings_By:string;
  panel_Builders: string[];
  programmed_By: string;
  tested_by: string;
  purchase_Orders: string[];
  parts_From_Storage:string[];
  invoices: string[];
  status:string;
}
