import { HttpClient } from '@angular/common/http';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Service-Files/auth.service';
// import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { DashboardService } from 'src/app/Service-Files/dashboard.service';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';

import{JobCard} from 'src/app/models/job-card.model'



import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServerURLService } from 'src/app/Service-Files/server-Url.service';


interface Tasks {
  jobNumber: any;
  description: any;
  task: any;
 
}


@Component({
  selector: 'app-your-tasks',
  templateUrl: './your-tasks.component.html',
  styleUrls: ['./your-tasks.component.css']
})
export class YourTasksComponent implements OnInit {
  // roles = localStorage.getItem("roles")!;
  roles = JSON.parse(localStorage.getItem("roles")!);
  userName = localStorage.getItem("name")!;
  userEmail = localStorage.getItem("email")!;
  

TASKS:Tasks[]=[]

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
  
  panelBuild_task_disabled_Arr:boolean[]=[]
  panelBuild_task_BC_arr : string[]=[];
  panelBuild_task_TC_arr : string[]=[];
  panelBuild_phase_status_arr: string[]=[]
  
  programmedBy_task_disabled_Arr:boolean[]=[]
  programmedBy_task_BC_arr : string[]=[];
  programmedBy_task_TC_arr : string[]=[];

  programming_phase_status_arr: string[]=[];
  programming_phase_arr: string[]=[];
  programming_phase_completed_arr: string[]=[];
  
  
testedBy_task_disabled_Arr:boolean[]=[]
  testedBy_task_BC_arr : string[]=[];
  testedBy_task_TC_arr : string[]=[];
  testedBy_phase_status_arr: string[]=[];
  

  ownerForJobCards_arr: string[]=[];
ownerForProblem:string = ""


  flag!: boolean;
  
  

  // tasks$: Observable<Task[]>;
  filter = new FormControl('');

    emailLoading:boolean=false;
    problemJobNum = '';
    constructor(private http: HttpClient,private ds: DashboardService, private JobCard_Service:JobCardService, private modalService: NgbModal 
      , private as:AuthService,private su: ServerURLService) {

      //   this.tasks$ = this.filter.valueChanges.pipe(
      //     startWith(''),
      //     map(text => this.search(text, pipe))
      //   );
      // }
       }

      ngOnInit(){


        var flag = setInterval(()=>{
    
          this.ds.GetJobs(this.userName).subscribe((data=>{

            var allTasksLength = data.drawings_JobNumber_arr.length +data.panel_Builders_JobNumber_arr.length+data.programmed_By_JobNumber_arr.length +data.tested_By_JobNumber_arr.length
            this.drawings_JobNumber_arr=data.drawings_JobNumber_arr
            this.drawings_Descr_arr=data.drawings_Descr_arr
            this.drawings_phase_status_arr= data.drawings_phase_status_arr
            
            this.panel_Builders_JobNumber_arr=data.panel_Builders_JobNumber_arr
            this.panel_Builders_Descr_arr=data.panel_Builders_Descr_arr
            this.panelBuild_phase_status_arr= data.panelBuild_phase_status_arr
    
            this.programmed_By_JobNumber_arr=data.programmed_By_JobNumber_arr
            this.programmed_By_Descr_arr=data.programmed_By_Descr_arr
            this.programming_phase_status_arr= data.programming_phase_status_arr

                    
            this.tested_By_JobNumber_arr=data.tested_By_JobNumber_arr
            this.tested_By_Descr_arr=data.tested_By_Descr_arr
            this.testedBy_phase_status_arr= data.testedBy_phase_status_arr
    
            this.ownerForJobCards_arr=data.ownerForJobCards_arr
//var count=0
            // for (let i = 0; i < data.drawings_JobNumber_arr.length; i++) {
            //   this.TASKS[count]={
            //     jobNumber: data.drawings_JobNumber_arr[i],
            //     description: data.drawings_Descr_arr[i],
            //     task: data.drawings_phase_status_arr[i]
            //   } 
            //   count++
            // }

            // for (let i = 0; i < data.panel_Builders_JobNumber_arr.length; i++) {
            //   this.TASKS[count]={
            //     jobNumber: data.panel_Builders_Descr_arr[i],
            //     description: data.panel_Builders_Descr_arr[i],
            //     task: data.panelBuild_phase_status_arr[i]
            //   } 
            //   count++
            // }

            // for (let i = 0; i < data.tested_By_JobNumber_arr.length; i++) {
            //   this.TASKS[count]={
            //     jobNumber: data.tested_By_JobNumber_arr[i],
            //     description: data.drawings_Descr_arr[i],
            //     task: data.testedBy_phase_status_arr[i]
            //   } 
            //   count++
            // }
            // for (let i = 0; i < data.programmed_By_JobNumber_arr.length; i++) {
            //   this.TASKS[count]={
            //     jobNumber: data.programmed_By_JobNumber_arr[i],
            //     description: data.programmed_By_Descr_arr[i],
            //     task: data.programming_phase_status_arr[i]
            //   } 
            //   count++
            // }


    

  
                this.checkPhases()
                    if (this.flag==false)
                    {
                 clearInterval(flag)
                    }
             
            }
            ))
        },1000)
    
    
    // initialize colours if nothing 
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


    // search(text: string, pipe: PipeTransform): Tasks[] {
    //   return this.TASKS.filter(tasks => {
    //     const term = text.toLowerCase();
    //     return tasks.jobNumber.toLowerCase().includes(term)
    //         || pipe.transform(tasks.description).includes(term)
    //         || pipe.transform(tasks.task).includes(term);
    //   });
    // }

    
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


}
