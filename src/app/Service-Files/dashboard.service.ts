import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { User } from "../models/user.model";
import { Router } from "@angular/router";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class DashboardService {

  constructor(private http: HttpClient, private router: Router) {}

  GetJobs(name: string) {
  return this.http.post<{
    drawings_JobNumber_arr: string[],
    drawings_Descr_arr:string[],
    drawings_phase_status_arr:string[],

    panel_Builders_JobNumber_arr:string[],
    panel_Builders_Descr_arr:string[],
    panelBuild_phase_status_arr:string[],

    programmed_By_JobNumber_arr:string[],
    programmed_By_Descr_arr:string[],
    programming_phase_status_arr:string[],

    tested_By_JobNumber_arr:string[],
    tested_By_Descr_arr:string[],
    testedBy_phase_status_arr:string[]
  }>("http://localhost:3000/dashboard/getuserjobs", {name:name})

  }


  savePhaseStatus(count:number,status:string,job_Number:any){
  
  return this.http.post("http://localhost:3000/dashboard/save-phase-status", {count:count,status:status,job_Number:job_Number})

  }

}