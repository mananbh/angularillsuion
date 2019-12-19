import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import {LabGuruReportcolnames} from '../../shared/classes/reportcolnames';
import {} from '../CommonModal/commonmodal'
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

export class rxfileupload{
  OrganizationUnitID: number;
  Attribute: string;
  FromDate:number;
  ToDate: string;
  ImpressionNo  : string;
}
export class GetcommdataService {
  uaturl = 'http://104.211.240.240/labguru_mobile/';
  localurl = 'http://10.10.0.149/api/'
  url = 'https://mobileapi.illusiondentallab.com/';

  header : any;  
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
  getProcess(filter:string){
    let data = {SSCID: "3249",SituationID: "5",UserID:"1",RoleID:"1",Filter1:filter,Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetCommonList',data,httpOptions);
  } 

  fetchlabgurureport(getlabgurudata) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.localurl+'/GetLabTechnicianPerformanceReport',getlabgurudata,httpOptions);
  } 

  getallpostdata() {
    //return  this.http.get(this.localurl+'/EmployeeInfo');
  return  this.http.get('http://104.211.240.240/API/api/mAudit'+"/EmployeeInfo");
 }


 getimagenameapi(getrximagereport:  rxfileupload): Observable<string> {
  const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return  this.http.post<string>(this.localurl+'/api/PP/UploadRx_Search',getrximagereport,httpOptions);
  } 

  //for login
  doLogin(data){
    return this.http.get(this.localurl+'Login?usercode='+data.username+'&password='+data.password+'&IPAddress=12.27382.4666');
  }

}
