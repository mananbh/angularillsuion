import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ReportType{
    SSCID: number;
    SituationID: number;
    UserID: number;
    RoleID: number;
    Filter1: number;
    Filter2:number;
    Filter3: string;
    Filter4: string;
}
export class GetcommdataService {
  localurl = 'http://10.10.0.149/API';
  header : any;  
  dataSource:any;
  /* dynamincnav:[]=JSON.parse(sessionStorage.getItem('userData'));
  dynamincnavfetch : string =this.dynamincnav["Data"]["MenuDetailDTO_List"]["1"]["sscid"]; */
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    
  }

   getReportType(){
    let data = {SSCID: "3249",SituationID: "1",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  }  

  getLocation(){
    let data = {SSCID: "3249",SituationID: "2",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  }  
  getEmployee(){
    let data = {SSCID: "3249",SituationID: "3",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  }  
  getDepartment(){
    let data = {SSCID: "3249",SituationID: "4",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  }  
  getProcess(){
    let data = {SSCID: "3249",SituationID: "5",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  } 
}
