import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import {LabGuruReportcolnames} from '../../shared/classes/reportcolnames';
import {} from '../CommonModal/commonmodal'
import { environment } from '../../../environments/environment';

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

export class ImpressionNo{
  
  ImpressionNo  : string;
}
export class GetcommdataService {
  private API_URL= environment.apiURL;

  uaturl = 'http://104.211.240.240/labguru_mobile/api';
  localurl = 'http://10.10.0.149/API/api'
  url = 'https://mobileapi.illusiondentallab.com/api';

  header : any;  
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    
  }

   getReportType(){
    let data = {SSCID: "3249",SituationID: "1",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetCommonList',data,httpOptions);
  }  

  getLocation(){
    let data = {SSCID: "3249",SituationID: "2",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetCommonList',data,httpOptions);
  }  
  getEmployee(){
    let data = {SSCID: "3249",SituationID: "3",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetCommonList',data,httpOptions);
  }  
  getDepartment(){
    let data = {SSCID: "3249",SituationID: "4",UserID:"1",RoleID:"1",Filter1:"16",Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetCommonList',data,httpOptions);
  }  
  getProcess(filter:string){
    let data = {SSCID: "3249",SituationID: "5",UserID:"1",RoleID:"1",Filter1:filter,Filter2:"0",Filter3:"0",Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetCommonList',data,httpOptions);
  } 

  fetchlabgurureport(getlabgurudata) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetLabTechnicianPerformanceReport',getlabgurudata,httpOptions);
  } 

  getallpostdata() {
    //return  this.http.get(this.localurl+'/EmployeeInfo');
  return  this.http.get('http://104.211.240.240/API/api/mAudit'+"/EmployeeInfo");
 }


 getimagenameapi(getrximagereport:  rxfileupload): Observable<string> {
  const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return  this.http.post<string>(this.API_URL+'/PP/UploadRx_Search',getrximagereport,httpOptions);
  } 

/*   getimpresionno(ImpressionNo) {
    return  this.http.get(this.url+'/PP/UploadCase_Search?ImpressionNo='+ImpressionNo);
    }  */

  //for login
  doLogin(data){
    return this.http.get(this.API_URL+'/PP/Login?usercode='+data.username+'&password='+data.password+'&IPAddress='+data.ipaddress);
  }

  getimpresionno(ImpressionNo){
    let data = {SSCID: "0",SituationID: "6",UserID:"0",RoleID:"0",Filter1:"0",Filter2:"0",Filter3:ImpressionNo,Filter4:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/JobEntryValidation',data,httpOptions);
  }  
  //for view imppresion
  getviewimpresiondata(impressiondata){
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/View_ImpressionDoc',impressiondata,httpOptions);
  } 

  getserachautocomplete(value){
    let data = {CustomerInput:value};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/Auto_Cust',data,httpOptions);
  }
  
  //sign out
  getsignoutlogin(value){
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.put(this.API_URL+'/PP/SignOut',value,httpOptions);
  }
//document upload type api
  getReportTypeforDoc(): Observable<any>{
    let data = {SituationID: "1"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post<any>(this.API_URL+'/PP/IncentiveTypeList',data,httpOptions);
  }  

  //view pre rx details
  GetTotalPreRXUploaded(prexrxdetails): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post<any>(this.API_URL+'/PP/GetTotalPreRXUploaded',prexrxdetails,httpOptions);
  }  

  //report genrateapi call
  getReportGenateData(SituationID){
    let data = {SituationID: SituationID};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/Get_Emp_Cust_Supp_Details',data,httpOptions);
  }  

  getalldatafilterreport(GroupReportID){
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.get(this.API_URL+'/PP/Get_Filter_Detail?GroupReportID='+GroupReportID+'',httpOptions);
  }  

  getallreportinlist(SoftwareSubComponentID){
    let data = {SoftwareSubComponentID: SoftwareSubComponentID};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetChkReportsDetail?SoftwareSubComponentID='+SoftwareSubComponentID+'',data,httpOptions);
  }  

  getAllReportsInGrid(reportsfilter){
    console.log(reportsfilter);
    let data = {ReportUserID: reportsfilter.ReportUserID,ReportMode: "Manual",ReportGroupID: reportsfilter.ReportGroupID,ReportList:reportsfilter.ReportList,Parameters:reportsfilter.Parameters,ExportTo:"E",MergeLevel:"0",Password:"",mrIdentifier:"",mrRequestStatus:"0",mtyIsSelectRequired:"1",SituationID:"0"};
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetGenerateReportingRequest',data,httpOptions);
  }  
//download reports
  getDownloadReports(DownloadReport){
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.API_URL+'/PP/GetMISDownloadData',DownloadReport,httpOptions);
  }  



}
