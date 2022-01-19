import { ArrayType } from "@angular/compiler";

export interface User {
  firstName: string;
  secondName: string;
  contactNumber: number;
  userEmail: string;
  password:string;
  roles: string[];
}
