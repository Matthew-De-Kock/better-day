import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Service-Files/auth.service';
// import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { DashboardService } from 'src/app/Service-Files/dashboard.service';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';

import{JobCard} from 'src/app/models/job-card.model'
import { ServerURLService } from 'src/app/Service-Files/server-Url.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
roles!:string[];
userName = localStorage.getItem("name")!;
userEmail = localStorage.getItem("email")!;




closeResult = '';


jobcard!:JobCard[]
filterValue!:string

drawings_JobNumber_arr! : string[];
drawings_Descr_arr! : string[];
panel_Builders_JobNumber_arr! : string[];
panel_Builders_Descr_arr! : string[];
programmed_By_JobNumber_arr! : string[];
programmed_By_Descr_arr! : string[];
tested_By_JobNumber_arr! : string[];
tested_By_Descr_arr! : string[];


drawings_task_disabled_Arr:boolean[]=[]
drawings_task_BC_arr : string[]=[];
drawings_task_TC_arr : string[]=[];
drawings_phase_status_arr: string[]=[];
drawings_status_arr: string[]=[];

panelBuild_task_disabled_Arr:boolean[]=[]
panelBuild_task_BC_arr : string[]=[];
panelBuild_task_TC_arr : string[]=[];
panelBuild_phase_status_arr: string[]=[]
panelBuild_status_arr: string[]=[]

programmedBy_task_disabled_Arr:boolean[]=[]
programmedBy_task_BC_arr : string[]=[];
programmedBy_task_TC_arr : string[]=[];
programming_phase_status_arr: string[]=[];
programming_status_arr: string[]=[];
// programming_phase_arr: string[]=[];


testedBy_task_disabled_Arr:boolean[]=[]
testedBy_task_BC_arr : string[]=[];
testedBy_task_TC_arr : string[]=[];
testedBy_phase_status_arr: string[]=[];
testedBy_status_arr: string[]=[];


ownerForJobCards_arr: string[]=[];
ownerForProblem:string = ""

flag!: boolean;



  emailLoading:boolean=false;
  problemJobNum = '';


  ownerJobNumber_Arr:string[]=[]
  ownerDescr_Arr:string[]=[]
  ownerStatus_Arr:string[]=[]
  ownerStatus_BC_Arr:string[]=[]
  ownerStatus_TC_Arr:string[]=[]

  ow_CI_JobNumber_Arr:string[]=[]
  ow_CI_Descr_Arr:string[]=[]
  ow_CI_Task_Arr:string[]=[]
  ow_CI_phaseStatus_Arr:string[]=[]
  
  ownerDashboard:boolean=false
 // ow_CI_phaseStatus_2D_Arr:string[]=[]
  //ow_CI_phaseStatus_1D_Arr:string[]=[]
  

  constructor(private http: HttpClient,private ds: DashboardService, private JobCard_Service:JobCardService, private modalService: NgbModal 
    , private as:AuthService,private su: ServerURLService) { }




  ngOnInit(){

    this.roles = JSON.parse(localStorage.getItem("roles")!);

    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i]=="Admin"||this.roles[i]=="Owner"){
        this.ownerDashboard=true
      }
    }

    var flag = setInterval(()=>{
      this.getOwnerJobCards()
var count  =0

      this.ds.GetJobs(this.userName).subscribe((data=>{
        this.drawings_JobNumber_arr=data.drawings_JobNumber_arr
        this.drawings_Descr_arr=data.drawings_Descr_arr
        this.drawings_phase_status_arr= data.drawings_phase_status_arr
        this.drawings_status_arr = data.drawings_status_arr
        
    
        this.panel_Builders_JobNumber_arr=data.panel_Builders_JobNumber_arr
        this.panel_Builders_Descr_arr=data.panel_Builders_Descr_arr
        this.panelBuild_phase_status_arr= data.panelBuild_phase_status_arr
        this.panelBuild_status_arr  = data.panelBuild_status_arr

        this.programmed_By_JobNumber_arr=data.programmed_By_JobNumber_arr
        this.programmed_By_Descr_arr=data.programmed_By_Descr_arr
        this.programming_phase_status_arr= data.programming_phase_status_arr
        this.programming_status_arr = data.programming_status_arr

        console.log( this.programming_status_arr)

        this.tested_By_JobNumber_arr=data.tested_By_JobNumber_arr
        this.tested_By_Descr_arr=data.tested_By_Descr_arr
        this.testedBy_phase_status_arr= data.testedBy_phase_status_arr
        this.testedBy_status_arr = data.testedBy_status_arr



       this.ownerForJobCards_arr=data.ownerForJobCards_arr

        this.checkPhases()

            if (this.flag==false)
                {
             clearInterval(flag)
                }
        }
        ))
    },1000)


// initialize colours if nothing 
if(this.ownerStatus_BC_Arr){
for (let i = 0; i < this.ownerStatus_Arr.length; i++) {
  this.ownerStatus_BC_Arr[i]=""
  this.ownerStatus_TC_Arr[i]=""
}
}
if(this.drawings_task_BC_arr){
for (let i = 0; i < this.drawings_task_BC_arr.length; i++) {
  this.drawings_task_BC_arr[i] =""
  this.drawings_task_TC_arr[i] = ""
}
}
if(this.panel_Builders_JobNumber_arr){
  for (let i = 0; i < this.panel_Builders_JobNumber_arr.length; i++) {

    this.panelBuild_task_BC_arr[i] =""
    this.panelBuild_task_TC_arr[i] =""
}
}

if(this.programmed_By_JobNumber_arr){
for (let i = 0; i < this.programmed_By_JobNumber_arr.length; i++) {
  this.programmedBy_task_BC_arr[i] =""
  this.programmedBy_task_TC_arr[i] =""
}
}

if(this.tested_By_JobNumber_arr){
  for (let i = 0; i < this.tested_By_JobNumber_arr.length; i++) {
    this.testedBy_task_BC_arr[i] =""
    this.testedBy_task_TC_arr[i] =""
  }
}

}


checkPhases(){

for (let i = 0; i < this.ownerStatus_Arr.length; i++) {
  
  if(this.ownerStatus_Arr[i]=='Acknowledge'){
    this.ownerStatus_BC_Arr[i]="#f0ad4e"
    this.ownerStatus_TC_Arr[i]='white'
  }
  else if(this.ownerStatus_Arr[i]=='Completed'){
    this.ownerStatus_BC_Arr[i]="#5cb85c"
    this.ownerStatus_TC_Arr[i]='white'
  }
  else if(this.ownerStatus_Arr[i]=='In Progress'){
    this.ownerStatus_BC_Arr[i]="#0275d8"
    this.ownerStatus_TC_Arr[i]='white'
  }
  else if(this.ownerStatus_Arr[i]==undefined){
    this.ownerStatus_BC_Arr[i]="rgb(242, 242, 242) "
    this.ownerStatus_TC_Arr[i]='black'
  }
  else if(this.ownerStatus_Arr[i]=='Problem'){
    this.ownerStatus_BC_Arr[i]="#d9534f"
    this.ownerStatus_TC_Arr[i]='white'
  }
}


  for (let i = 0; i < this.drawings_phase_status_arr.length; i++) {
    if(this.drawings_phase_status_arr[i]=='Acknowledge'){
      this.drawings_task_BC_arr[i]="#f0ad4e"
      this.drawings_task_TC_arr[i]='white'
      this.drawings_task_disabled_Arr[i]=false
    }
    else if(this.drawings_phase_status_arr[i]=='Completed'){
      this.drawings_task_BC_arr[i]="#5cb85c"
      this.drawings_task_TC_arr[i]='white'
      this.drawings_task_disabled_Arr[i]=false
    }
    else if(this.drawings_phase_status_arr[i]=='In Progress'){
      this.drawings_task_BC_arr[i]="#0275d8"
      this.drawings_task_TC_arr[i]='white'
      this.drawings_task_disabled_Arr[i]=false
    }
    else if(this.drawings_phase_status_arr[i]==undefined){
      this.drawings_task_BC_arr[i]="rgb(242, 242, 242) "
      this.drawings_task_TC_arr[i]='black'
      this.drawings_task_disabled_Arr[i]=false
    }
    else if(this.drawings_phase_status_arr[i]=='Problem'){
      this.drawings_task_BC_arr[i]="#d9534f"
      this.drawings_task_TC_arr[i]='white'
      this.drawings_task_disabled_Arr[i]=true
    }
    
  }

  for (let i = 0; i < this.panelBuild_phase_status_arr.length; i++) {

    if(this.panelBuild_phase_status_arr[i]=='Acknowledge'){
      this.panelBuild_task_BC_arr[i]="#f0ad4e"
      this.panelBuild_task_TC_arr[i]='white'
      this.panelBuild_task_disabled_Arr[i]=false
    }
    else if(this.panelBuild_phase_status_arr[i]=='Completed'){
      this.panelBuild_task_BC_arr[i]="#5cb85c"
      this.panelBuild_task_TC_arr[i]='white'
      this.panelBuild_task_disabled_Arr[i]=false
    }
    else if(this.panelBuild_phase_status_arr[i]=='In Progress'){
      this.panelBuild_task_BC_arr[i]="#0275d8"
      this.panelBuild_task_TC_arr[i]='white'
      this.panelBuild_task_disabled_Arr[i]=false
    }
    else if(this.panelBuild_phase_status_arr[i]==undefined){
      this.panelBuild_task_BC_arr[i]="rgb(242, 242, 242) "
      this.panelBuild_task_TC_arr[i]='black'
      this.panelBuild_task_disabled_Arr[i]=false
    }
    else if(this.panelBuild_phase_status_arr[i]=='Problem'){
      this.panelBuild_task_BC_arr[i]="#d9534f"
      this.panelBuild_task_TC_arr[i]='white'
      this.panelBuild_task_disabled_Arr[i]=true
    }
    
  }


  for (let i = 0; i < this.programming_phase_status_arr.length; i++) {
    if(this.programming_phase_status_arr[i]=='Acknowledge'){
      this.programmedBy_task_BC_arr[i]="#f0ad4e"
      this.programmedBy_task_TC_arr[i]='white'
      // this.programming_phase_arr[i]= ""
      this.programmedBy_task_disabled_Arr[i]=false
    }
    else if(this.programming_phase_status_arr[i]=='Completed'){
      this.programmedBy_task_BC_arr[i]="#5cb85c"
      this.programmedBy_task_TC_arr[i]='white'
      this.programmedBy_task_disabled_Arr[i]=false
    }
    else if(this.programming_phase_status_arr[i]=='In Progress'){
      this.programmedBy_task_BC_arr[i]="#0275d8"
      this.programmedBy_task_TC_arr[i]='white'
      this.programmedBy_task_disabled_Arr[i]=false
    }
    else if(this.programming_phase_status_arr[i]==undefined){
      this.programmedBy_task_BC_arr[i]="rgb(242, 242, 242) "
      this.programmedBy_task_TC_arr[i]='black'
      this.programmedBy_task_disabled_Arr[i]=false
    }
    else if(this.programming_phase_status_arr[i]=='Problem'){
      this.programmedBy_task_BC_arr[i]="#d9534f"
      this.programmedBy_task_TC_arr[i]='white'
      this.programmedBy_task_disabled_Arr[i]=true
    }
  
  }



      for (let i = 0; i < this.testedBy_phase_status_arr.length; i++) {
        if(this.testedBy_phase_status_arr[i]=='Acknowledge'){
          this.testedBy_task_BC_arr[i]="#f0ad4e"
          this.testedBy_task_TC_arr[i]='white'
          this.testedBy_task_disabled_Arr[i]
        }
        else if(this.testedBy_phase_status_arr[i]=='Completed'){
          this.testedBy_task_BC_arr[i]="#5cb85c"
          this.testedBy_task_TC_arr[i]='white'
          this.testedBy_task_disabled_Arr[i]
        }
        else if(this.testedBy_phase_status_arr[i]=='In Progress'){
          this.testedBy_task_BC_arr[i]="#0275d8"
          this.testedBy_task_TC_arr[i]='white'
          this.testedBy_task_disabled_Arr[i]
        }
        else if(this.testedBy_phase_status_arr[i]==undefined){
          this.testedBy_task_BC_arr[i]="rgb(242, 242, 242) "
          this.testedBy_task_TC_arr[i]='black'
          this.testedBy_task_disabled_Arr[i]
        }
        else if(this.testedBy_phase_status_arr[i]=='Problem'){
          this.testedBy_task_BC_arr[i]="#d9534f"
          this.testedBy_task_TC_arr[i]='white'
          this.testedBy_task_disabled_Arr[i]

   


        }
      }
    


}


onSendMail(form: NgForm){

//  var supervisorEmail= form.value.supervisor
  var problemDescription =  form.value.description


var ownerName= this.ownerForProblem
 var problemDescription =  form.value.description
 var ownerEmail:string = ""
 let info={
   name:ownerName
 }
this.http.post(this.su.serverURL+"/get-owner-email",info).subscribe(data=>{
  var rsp:any = data

 ownerEmail = rsp.result.email
 console.log(ownerEmail)
/////////////////////////////////////////
 this.emailLoading=true
 let info ={
   userName: this.userName,
   userEmail: this.userEmail,
   ownerEmail: ownerEmail,
   problemDescription: problemDescription,
   jobNumber: this.problemJobNum
 }
 this.http.post( this.su.serverURL+"/sendmail", info).subscribe(
   data=>{
     let resp:any=data
     console.log("Email has been sent out to Supervisor")

     this.emailLoading=false
   },
 )



})




}
onDrawingTaskStatusSelect(stat:any,job_Number:string,content:any,i:any){
  this.ownerForProblem = this.ownerForJobCards_arr[i]
    this.ds.savePhaseStatus(1,stat.target.value,job_Number)
    .subscribe(data =>{
      this.problemJobNum = job_Number
          if(stat.target.value=="Problem"){
            this.modalService.open(content).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
          }
      



})


  }

  onProgrammedByTaskStatusSelect(stat:any, job_Number:string,content:any,i:any){
  this.ownerForProblem = this.ownerForJobCards_arr[i]
    this.ds.savePhaseStatus(3,stat.target.value,job_Number)
    .subscribe(data =>{
      console.log(data)
this.problemJobNum = job_Number
    if(stat.target.value=="Problem"){
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }


})

    }

    onTestedByTaskStatusSelect(stat:any, job_Number:string,content:any,i:any){
      this.ownerForProblem = this.ownerForJobCards_arr[i]
      this.ds.savePhaseStatus(4,stat.target.value,job_Number)
      .subscribe(data =>{
        this.problemJobNum = job_Number
            if(stat.target.value=="Problem"){
              this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });
            }
        
  })
  
      }

      onPanelBuildTaskStatusSelect(stat:any, job_Number:string,content:any,i:any){
        this.ownerForProblem = this.ownerForJobCards_arr[i]
        this.ds.savePhaseStatus(2,stat.target.value,job_Number)
        .subscribe(data =>{
          this.problemJobNum = job_Number
              if(stat.target.value=="Problem"){
                this.modalService.open(content).result.then((result) => {
                  this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
              }
          
    })
    
        }


        private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return `with: ${reason}`;
          }
        }

        ngOnDestroy(){
          this.flag=false;
        }

        //Owner Functions

        getOwnerJobCards(){
var ownerRole:boolean=false

for (let i = 0; i < this.roles.length; i++) {
  if (this.roles[i]=="Admin"||this.roles[i]=="Owner"){
    ownerRole=true
  }
}



 if (ownerRole==true){
   let info={
     userName: this.userName
   }
   this.http.post(this.su.serverURL+"/jobcard/owner-jobcards",info).subscribe(rsp=>{
    var data:any 
    data = rsp
 for (var i = 0; i< data.record.length; i++){
 this.ownerJobNumber_Arr[i] = data.record[i].job_Number,
  this.ownerDescr_Arr[i] = data.record[i].description
  this.ownerStatus_Arr[i] = data.record[i].status





 if(data.record[i].phases[1]=="Problem"){
 this.ow_CI_phaseStatus_Arr[i]= data.record[i].phases[1]
 this.ow_CI_Task_Arr[i]="Drawing"
 this.ow_CI_JobNumber_Arr[i] = data.record[i].job_Number
 this.ow_CI_Descr_Arr[i] = data.record[i].description
 }
 else if(data.record[i].phases[2]=="Problem"){
 this.ow_CI_phaseStatus_Arr[i]= data.record[i].phases[2]
 this.ow_CI_Task_Arr[i]="Panel Build"
 this.ow_CI_JobNumber_Arr[i] = data.record[i].job_Number
 this.ow_CI_Descr_Arr[i] = data.record[i].description
 }
 else if(data.record[i].phases[3]=="Problem"){
 this.ow_CI_phaseStatus_Arr[i]= data.record[i].phases[3]
 this.ow_CI_Task_Arr[i]="Programing"
 this.ow_CI_JobNumber_Arr[i] = data.record[i].job_Number
 this.ow_CI_Descr_Arr[i] = data.record[i].description
 }
 else if(data.record[i].phases[4]=="Problem"){
 this.ow_CI_phaseStatus_Arr[i]= data.record[i].phases[4]
 this.ow_CI_Task_Arr[i]="Testing"
 this.ow_CI_JobNumber_Arr[i] = data.record[i].job_Number
 this.ow_CI_Descr_Arr[i] = data.record[i].description
 }

//  console.log( 
//    this.ow_CI_phaseStatus_Arr[i],
//   this.ow_CI_Task_Arr[i],
//   this.ow_CI_JobNumber_Arr[i],
//   this.ow_CI_Descr_Arr[i])
}
   })

 }
        }

        onCriticalItemsStatusSelect(stat:any, job_Number:string,content:any, task:any){
         var phaseNumber=0
          if (task=="Drawing"){
            phaseNumber = 1
          }
          else if (task=="Panel Build"){
            phaseNumber = 2
          }
          else if (task=="Programing"){
            phaseNumber = 3
          }
          else if (task=="Testing"){
            phaseNumber = 4
          }
          this.ds.savePhaseStatus(phaseNumber,stat.target.value,job_Number)
          .subscribe(data =>{
            this.problemJobNum = job_Number
                if(stat.target.value=="Problem"){
                  this.modalService.open(content).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                  }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });
                }      
      })
      
          }
}
