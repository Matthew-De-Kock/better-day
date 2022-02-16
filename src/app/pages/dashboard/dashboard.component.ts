import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/Service-Files/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
role = localStorage.getItem("role")!;
name = localStorage.getItem("name")!;


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

panelBuild_task_BC_arr : string[]=[];
panelBuild_task_TC_arr : string[]=[];

programmedBy_task_BC_arr : string[]=[];
programmedBy_task_TC_arr : string[]=[];

testedBy_task_BC_arr : string[]=[];
testedBy_task_TC_arr : string[]=[];
  constructor(private ds: DashboardService) { }

  ngOnInit(){



this.ds.GetJobs(this.name).subscribe((data=>{
console.log(data)



this.statSelected[0] = ''
// this.drawings_task_BC_arr[0]="#5cb85c"
// this.drawings_task_BC_arr[1]="#0275d8"

this.drawings_JobNumber_arr=data.drawings_JobNumber_arr
this.drawings_Descr_arr=data.drawings_Descr_arr
this.panel_Builders_JobNumber_arr=data.panel_Builders_JobNumber_arr
this.panel_Builders_Descr_arr=data.panel_Builders_Descr_arr
this.programmed_By_JobNumber_arr=data.programmed_By_JobNumber_arr
this.programmed_By_Descr_arr=data.programmed_By_Descr_arr
this.tested_By_JobNumber_arr=data.tested_By_JobNumber_arr
this.tested_By_Descr_arr=data.tested_By_Descr_arr


})
)

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

onStatusChange(jobcard:any,stat:any){
console.log(jobcard)
console.log(stat.target.value)
}

onDrawingTaskStatusSelect(i:any,stat:any,job_Number:string){
  console.log(stat.target.value)
  switch(stat.target.value)
{ case"Completed":
     this.drawings_task_BC_arr[i]="#5cb85c"
    this.drawings_task_TC_arr[i]="white"
  break;

  case"In Progress":
     this.drawings_task_BC_arr[i]="#0275d8"
     this.drawings_task_TC_arr[i]="white"
  break;

  case"Problem":
     this.drawings_task_BC_arr[i]="#d9534f"
     this.drawings_task_TC_arr[i]="white"
  break;

  case"":
  this.drawings_task_BC_arr[i]="white"
  this.drawings_task_TC_arr[i]="black"
break;
}

this.ds.saveDrawingsStatus(i,stat.target.value,job_Number)
.subscribe(data =>{
console.log(data)
})


  }

  onProgrammedByTaskStatusSelect(i:any,stat:any, job_Number:string){
    console.log(stat.target.value)
    switch(stat.target.value)
  { case"Completed":
       this.programmedBy_task_BC_arr[i]="#5cb85c"
      this.programmedBy_task_TC_arr[i]="white"
    break;

    case"In Progress":
       this.programmedBy_task_BC_arr[i]="#0275d8"
       this.programmedBy_task_TC_arr[i]="white"
    break;

    case"Problem":
       this.programmedBy_task_BC_arr[i]="#d9534f"
       this.programmedBy_task_TC_arr[i]="white"
    break;

    case"":
    this.programmedBy_task_BC_arr[i]="white"
    this.programmedBy_task_TC_arr[i]="black"
  break;
  }
    }

    onTestedByTaskStatusSelect(i:any,stat:any,job_Number:string){
      console.log(stat.target.value)
      switch(stat.target.value)
    { case"Completed":
         this.testedBy_task_BC_arr[i]="#5cb85c"
        this.testedBy_task_TC_arr[i]="white"
      break;

      case"In Progress":
         this.testedBy_task_BC_arr[i]="#0275d8"
         this.testedBy_task_TC_arr[i]="white"
      break;

      case"Problem":
         this.testedBy_task_BC_arr[i]="#d9534f"
         this.testedBy_task_TC_arr[i]="white"
      break;

      case"":
      this.testedBy_task_BC_arr[i]="white"
      this.testedBy_task_TC_arr[i]="black"
    break;
    }
      }

      onPanelBuildTaskStatusSelect(i:any,stat:any,job_Number:string){
        console.log(stat.target.value)
        switch(stat.target.value)
      { case"Completed":
          this.panelBuild_task_BC_arr[i]="#5cb85c"
          this.panelBuild_task_TC_arr[i]="white"
        break;

        case"In Progress":
           this.panelBuild_task_BC_arr[i]="#0275d8"
           this.panelBuild_task_TC_arr[i]="white"
        break;

        case"Problem":
           this.panelBuild_task_BC_arr[i]="#d9534f"
           this.panelBuild_task_TC_arr[i]="white"
        break;

        case"":
        this.panelBuild_task_BC_arr[i]="white"
        this.panelBuild_task_TC_arr[i]="black"
      break;
      }
        }





onButtonClick(jobcard:any){

  console.log(jobcard)
}


}
