import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ServerURLService {

NUM:Number;


  public serverURL:any
  public wsURL:any
  public guardURL:any;


constructor(){
//When this.NUM is eqaul to 0 you can only use it in local host.
//If this .NUM is eqaul to 1 you can only use it allelectrical
  this.NUM = 0

//http://41.112.77.62:3000


if (this.NUM==0){
   this.serverURL = "http://localhost:3000";
   this.wsURL = "ws://localhost"
   this.guardURL  = "4200"  //localhost
}
else if (this.NUM==1){

    this.serverURL = "http://41.112.77.62:3000";
    this.wsURL = "ws://41.112.77.62";
    this.guardURL = "20010"  //SERVER
}}

}
