import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/Service-Files/dashboard.service';
import { JobCardService } from 'src/app/Service-Files/jobcard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
role = localStorage.getItem("role")!;
name = localStorage.getItem("name")!;


phases!: string[]

drawings_JobNumber_arr! : string[];
drawings_Descr_arr! : string[];
panel_Builders_JobNumber_arr! : string[];
panel_Builders_Descr_arr! : string[];
programmed_By_JobNumber_arr! : string[];
programmed_By_Descr_arr! : string[];
tested_By_JobNumber_arr! : string[];
tested_By_Descr_arr! : string[];

statSelected:string[]=[];
stat:any;

drawings_task_BC_arr : string[]=[];
drawings_task_TC_arr : string[]=[];
drawings_phase_status_arr: string[]=[];

panelBuild_task_BC_arr : string[]=[];
panelBuild_task_TC_arr : string[]=[];
panelBuild_phase_status_arr: string[]=[]

programmedBy_task_BC_arr : string[]=[];
programmedBy_task_TC_arr : string[]=[];
programming_phase_status_arr: string[]=[];

testedBy_task_BC_arr : string[]=[];
testedBy_task_TC_arr : string[]=[];
testedBy_phase_status_arr: string[]=[];

  flag!: boolean;
  constructor(private ds: DashboardService, private JobCard_Service:JobCardService, ) { }


ngOnDestroy(){
  this.flag=false;
}

  ngOnInit(){
    var flag = setInterval(()=>{

      this.ds.GetJobs(this.name).subscribe((data=>{
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
        console.log(this.panelBuild_phase_status_arr)

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
    }
    else if(this.drawings_phase_status_arr[i]=='Completed'){
      this.drawings_task_BC_arr[i]="#5cb85c"
      this.drawings_task_TC_arr[i]='white'
    }
    else if(this.drawings_phase_status_arr[i]=='In Progress'){
      this.drawings_task_BC_arr[i]="#0275d8"
      this.drawings_task_TC_arr[i]='white'
    }
    else if(this.drawings_phase_status_arr[i]==undefined){
      this.drawings_task_BC_arr[i]="rgb(242, 242, 242) "
      this.drawings_task_TC_arr[i]='black'
    }
    else if(this.drawings_phase_status_arr[i]=='Problem'){
      this.drawings_task_BC_arr[i]="#d9534f"
      this.drawings_task_TC_arr[i]='white'
    }
    
  }

console.log(this.panelBuild_phase_status_arr)
  for (let i = 0; i < this.panelBuild_phase_status_arr.length; i++) {

    if(this.panelBuild_phase_status_arr[i]=='Acknowledge'){
      this.panelBuild_task_BC_arr[i]="#f0ad4e"
      this.panelBuild_task_TC_arr[i]='white'
    }
    else if(this.panelBuild_phase_status_arr[i]=='Completed'){
      this.panelBuild_task_BC_arr[i]="#5cb85c"
      this.panelBuild_task_TC_arr[i]='white'
    }
    else if(this.panelBuild_phase_status_arr[i]=='In Progress'){
      this.panelBuild_task_BC_arr[i]="#0275d8"
      this.panelBuild_task_TC_arr[i]='white'
    }
    else if(this.panelBuild_phase_status_arr[i]==undefined){
      this.panelBuild_task_BC_arr[i]="rgb(242, 242, 242) "
      this.panelBuild_task_TC_arr[i]='black'
    }
    else if(this.panelBuild_phase_status_arr[i]=='Problem'){
      this.panelBuild_task_BC_arr[i]="#d9534f"
      this.panelBuild_task_TC_arr[i]='white'
    }
    
  }



  for (let i = 0; i < this.programming_phase_status_arr.length; i++) {
    if(this.programming_phase_status_arr[i]=='Acknowledge'){
      this.programmedBy_task_BC_arr[i]="#f0ad4e"
      this.programmedBy_task_TC_arr[i]='white'
    }
    else if(this.programming_phase_status_arr[i]=='Completed'){
      this.programmedBy_task_BC_arr[i]="#5cb85c"
      this.programmedBy_task_TC_arr[i]='white'
    }
    else if(this.programming_phase_status_arr[i]=='In Progress'){
      this.programmedBy_task_BC_arr[i]="#0275d8"
      this.programmedBy_task_TC_arr[i]='white'
    }
    else if(this.programming_phase_status_arr[i]==undefined){
      this.programmedBy_task_BC_arr[i]="rgb(242, 242, 242) "
      this.programmedBy_task_TC_arr[i]='black'
    }
    else if(this.programming_phase_status_arr[i]=='Problem'){
      this.programmedBy_task_BC_arr[i]="#d9534f"
      this.programmedBy_task_TC_arr[i]='white'
    }
  }



      for (let i = 0; i < this.testedBy_phase_status_arr.length; i++) {
        if(this.testedBy_phase_status_arr[i]=='Acknowledge'){
          this.testedBy_task_BC_arr[i]="#f0ad4e"
          this.testedBy_task_TC_arr[i]='white'
        }
        else if(this.testedBy_phase_status_arr[i]=='Completed'){
          this.testedBy_task_BC_arr[i]="#5cb85c"
          this.testedBy_task_TC_arr[i]='white'
        }
        else if(this.testedBy_phase_status_arr[i]=='In Progress'){
          this.testedBy_task_BC_arr[i]="#0275d8"
          this.testedBy_task_TC_arr[i]='white'
        }
        else if(this.testedBy_phase_status_arr[i]==undefined){
          this.testedBy_task_BC_arr[i]="rgb(242, 242, 242) "
          this.testedBy_task_TC_arr[i]='black'
        }
        else if(this.testedBy_phase_status_arr[i]=='Problem'){
          this.testedBy_task_BC_arr[i]="#d9534f"
          this.testedBy_task_TC_arr[i]='white'
        }
      }
    


}

onDrawingTaskStatusSelect(stat:any,job_Number:string){
    this.ds.savePhaseStatus(1,stat.target.value,job_Number)
    .subscribe(data =>{
    console.log(data)
})


  }

  onProgrammedByTaskStatusSelect(stat:any, job_Number:string){
    this.ds.savePhaseStatus(3,stat.target.value,job_Number)
    .subscribe(data =>{
    console.log(data)
})

    }

    onTestedByTaskStatusSelect(stat:any,job_Number:string){
      this.ds.savePhaseStatus(4,stat.target.value,job_Number)
      .subscribe(data =>{
      console.log(data)
  })
  
      }

      onPanelBuildTaskStatusSelect(stat:any,job_Number:string){
        this.ds.savePhaseStatus(2,stat.target.value,job_Number)
        .subscribe(data =>{
        console.log(data)
    })
    
        }



}
