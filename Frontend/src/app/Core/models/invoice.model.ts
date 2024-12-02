import { Client } from "./client.model";
import { User } from "./user.model";

export interface Invoice {
    id?: number ;
    status: string | undefined; 
    companyName:string;
    amount: number; 
    dueDate: string; 
    issueDate: string; 
    file?:string;
    client:Client;
  }
  